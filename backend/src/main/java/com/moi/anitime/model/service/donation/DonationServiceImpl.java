package com.moi.anitime.model.service.donation;

import com.moi.anitime.api.response.donation.DonationBoardListRes;
import com.moi.anitime.api.response.donation.DonationBoardRes;
import com.moi.anitime.api.response.donation.DonationBoardsListForShelterRes;
import com.moi.anitime.api.response.donation.DonationListRes;
import com.amazonaws.util.Base64;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.Donation;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.repo.DonationBoardRepo;
import com.moi.anitime.model.repo.DonationRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

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
    @Value("${toss.payment.secret.encode}")
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
    public DonationBoardRes findDonationBoardByBoardNo(int boardNo) {
        Optional<DonationBoard> res = donationBoardRepo.findDonationBoardByBoardNo(boardNo);
        if (res.isEmpty()) throw new NonExistDonationBoardException();
        DonationBoard board = res.get();
        int cal = board.getAttainAmount() * 100 / board.getGoalAmount();

        DonationBoardRes donationBoardRes = DonationBoardRes.builder()
                .title(board.getTitle())
                .dDay(Period.between(LocalDate.now(), board.getEndAt()).getDays())
                .thumbnail(board.getImage1())
                .attain(board.getAttainAmount())
                .goal(board.getGoalAmount())
                .detail(board.getPoster())
                .achievement(cal)
                .poster(board.getPoster())
                .build();

        return donationBoardRes;
    }

    @Override
    public Page<DonationBoardsListForShelterRes> findDonationBoardsByShelter_MemberNo(int shelterNo, int curPageNo) {
        if (memberRepo.findShelterMemberByMemberNo(shelterNo).isEmpty())
            throw new NonExistMemberNoException();
        Page<DonationBoard> res =  donationBoardRepo.findDonationBoardsByShelter_MemberNo(shelterNo, PageRequest.of(curPageNo, 10));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        List<DonationBoardsListForShelterRes> data = res.getContent().stream()
                .map(board -> {
                    DonationBoardsListForShelterRes donationBoardsListForShelterRes = DonationBoardsListForShelterRes.builder()
                            .title(board.getTitle())
                            .date(board.getStartAt().format(formatter) + " ~ " + board.getEndAt().format(formatter))
                            .attained(board.getAttainAmount() + "원")
                            .goal(board.getGoalAmount() + "원")
                            .boardNo(board.getBoardNo())
                            .build();

                    if (LocalDate.now().isBefore(board.getStartAt())) donationBoardsListForShelterRes.setStatus(0);
                    else if (!LocalDate.now().isAfter(board.getEndAt())) donationBoardsListForShelterRes.setStatus(1);
                    else if (board.getAttainAmount() >= board.getGoalAmount()) donationBoardsListForShelterRes.setStatus(2);
                    else if (board.getAttainAmount() < board.getGoalAmount()) donationBoardsListForShelterRes.setStatus(3);
                    return donationBoardsListForShelterRes;
                })
                .collect(Collectors.toList());

        Page<DonationBoardsListForShelterRes> response = new PageImpl<>(data, res.getPageable(), res.getTotalElements());
        return response;
    }

    @Override
    public Page<DonationBoardListRes> findDonationBoards(String title, String name, int curPageNo) {
        Page<DonationBoard> res =  donationBoardRepo.findDonationBoards(title, name, PageRequest.of(curPageNo, 10));

        List<DonationBoardListRes> data = res.getContent().stream()
                .map(board -> {
                    int cal = board.getAttainAmount() * 100 / board.getGoalAmount();
                    DonationBoardListRes donationBoardListRes = DonationBoardListRes.builder()
                            .thumbnail(board.getImage1())
                            .title(board.getTitle())
                            .shelter(board.getShelter().getName())
                            .dDay(Period.between(LocalDate.now(), board.getEndAt()).getDays())
                            .achievement(cal)
                            .attained(board.getAttainAmount() + "원")
                            .goal(board.getGoalAmount() + "원")
                            .boardNo(board.getBoardNo())
                            .build();
                    return donationBoardListRes;
                }).collect(Collectors.toList());

        return new PageImpl<>(data, res.getPageable(), res.getTotalElements());
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
    public Page<DonationListRes> findDonationsByBoardNo(int boardNo, int curPageNo) {
        if (donationBoardRepo.findDonationBoardByBoardNo(boardNo).isEmpty())
            throw new NonExistDonationBoardException();
        Page<Donation> res = donationRepo.findDonationsByBoardNo(boardNo, PageRequest.of(curPageNo, 10));

        List<DonationListRes> data = res.getContent().stream()
                .map(donation -> {
                    DonationListRes donationListRes = DonationListRes.builder()
                            .donationDate(donation.getDonateDate().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")))
                            .money(donation.getDonateAmount() + "원").build();
                    Optional<Member> member = memberRepo.findById(donation.getGeneralNo());
                    if (member.isPresent()) donationListRes.setMemberName(member.get().getName());
                    else donationListRes.setMemberName("익명");
                    return donationListRes;
                }).collect(Collectors.toList());

        return new PageImpl<>(data, res.getPageable(), res.getTotalElements());
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
    @Transactional
    public void testPayment(String orderId, String paymentKey, int amount) throws IOException{
        String reqURL = "https://api.tosspayments.com/v1/payments/confirm";

        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        conn.setRequestProperty("Authorization", "Basic " + secret_key);
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
        System.out.println("dddd");
        while ((line = br.readLine()) != null) {
            result += line;
        }
        System.out.println("response body : " + result);

        //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(result);
        String don_mem = element.getAsJsonObject().get("orderName").getAsString();
        System.out.println(don_mem);
        StringTokenizer st = new StringTokenizer(don_mem, " ");
        int boardNo = Integer.parseInt(st.nextToken());
        int memberNo = Integer.parseInt(st.nextToken());

        Donation donation = Donation.builder()
                .boardNo(boardNo)
                .generalNo(memberNo)
                .donateAmount(amount)
                .donateDate(LocalDateTime.now()).build();
        donationRepo.save(donation);
        donationBoardRepo.updateAmount(boardNo, amount);
    }
}
