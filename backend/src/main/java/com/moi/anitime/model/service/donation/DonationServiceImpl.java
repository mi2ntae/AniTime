package com.moi.anitime.model.service.donation;

import com.amazonaws.util.Base64;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.Donation;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.repo.DonationBoardRepo;
import com.moi.anitime.model.repo.DonationRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class DonationServiceImpl implements DonationService {
    private final DonationRepo donationRepo;
    private final DonationBoardRepo donationBoardRepo;
    private final MemberRepo memberRepo;
    private final S3Uploader s3Uploader;

    @Value("${donationBoard.image.path}")
    private String imagePath;
    @Value("${donationBoard.poster.path}")
    private String posterPath;
    @Value("${toss.payment.secret}")
    private String secret_key;

    @Override
    public void registerDonationBoard(DonationBoard donationBoard, MultipartFile image, MultipartFile poster) throws IOException {
        if (memberRepo.findShelterMemberByMemberNo(donationBoard.getShelterNo()).isEmpty())
            throw new NonExistMemberNoException();
        String storedImageName = s3Uploader.upload(image, imagePath);
        donationBoard.setImage1(storedImageName);
        if (poster != null) {
            String storedPosterName = s3Uploader.upload(poster, posterPath);
            donationBoard.setPoster(storedPosterName);
        }
        donationBoardRepo.save(donationBoard);
    }

    @Override
    public DonationBoard findDonationBoardByBoardNo(int boardNo) {
        Optional<DonationBoard> board = donationBoardRepo.findDonationBoardByBoardNo(boardNo);
        if (board.isEmpty()) throw new NonExistDonationBoardException();
        return board.get();
    }

    @Override
    public Page<DonationBoard> findDonationBoardsByShelter_MemberNo(int shelterNo, int curPageNo) {
        if (memberRepo.findShelterMemberByMemberNo(shelterNo).isEmpty())
            throw new NonExistMemberNoException();
        return donationBoardRepo.findDonationBoardsByShelter_MemberNo(shelterNo, PageRequest.of(curPageNo, 10));
    }

    @Override
    public Page<DonationBoard> findDonationBoards(String title, String name, int curPageNo) {
        return donationBoardRepo.findDonationBoards(title, name, PageRequest.of(curPageNo, 10));
    }

    @Override
    @Transactional
    public void registerDonation(Donation donation) {
        Optional<DonationBoard> donationBoard = donationBoardRepo.findDonationBoardByBoardNo(donation.getBoardNo());
        if (donationBoard.isEmpty())
            throw new NonExistDonationBoardException();
        donationRepo.save(donation);
        donationBoard.get().setAttainAmount(donationBoard.get().getAttainAmount() + donation.getDonateAmount());
    }

    @Override
    public Donation findDonationByDonationNo(int donationNo) {
        Optional<Donation> donation = donationRepo.findDonationByDonationNo(donationNo);
        if (donation.isEmpty())
            throw new NonExistDonationException();
        return donation.get();
    }

    @Override
    public Page<Donation> findDonationsByBoardNo(int boardNo, int curPageNo) {
        if (donationBoardRepo.findDonationBoardByBoardNo(boardNo).isEmpty())
            throw new NonExistDonationBoardException();
        return donationRepo.findDonationsByBoardNo(boardNo, PageRequest.of(curPageNo, 10));
    }

    @Override
    @Transactional
    public void deleteDonationByDonationNo(int donationNo) {
        Optional<Donation> donation = donationRepo.findDonationByDonationNo(donationNo);
        if (donation.isEmpty())
            throw new NonExistDonationException();
        donationRepo.deleteDonationByDonationNo(donationNo);
        Optional<DonationBoard> donationBoard = donationBoardRepo.findDonationBoardByBoardNo(donation.get().getBoardNo());
        donationBoard.ifPresent(board -> board.setAttainAmount(board.getAttainAmount() - donation.get().getDonateAmount()));
    }

    @Override
    public void testPayment(String orderId, String paymentKey, int amount) throws IOException{
        String reqURL = "https://api.tosspayments.com/v1/payments/confirm";

        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        String key = secret_key+":";
        System.out.println(key);
        byte[] encoded = Base64.encode(key.getBytes());
        System.out.println(encoded);
        conn.setRequestProperty("Authorization", "Basic " + encoded);
        //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        JSONObject send = new JSONObject();
        send.put("paymentKey", paymentKey);
        send.put("orderId", orderId);
        send.put("amount", amount);
        bw.write(send.toString());
        bw.flush();

        //결과 코드가 200이라면 성공
        int responseCode = conn.getResponseCode();
        System.out.println("responseCode : " + responseCode);

        //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }
        System.out.println("response body : " + result);

        //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(result);

//        access_Token = element.getAsJsonObject().get("access_token").getAsString();
//        refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
//        System.out.println("access_token : " + access_Token);
//        System.out.println("refresh_token : " + refresh_Token);
    }
}
