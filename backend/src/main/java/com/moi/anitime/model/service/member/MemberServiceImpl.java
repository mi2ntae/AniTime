package com.moi.anitime.model.service.member;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.moi.anitime.api.request.member.GeneralMemberRegistReq;
import com.moi.anitime.api.request.member.MemberEditReq;
import com.moi.anitime.api.request.member.MemberLoginReq;
import com.moi.anitime.api.request.member.ShelterMemberRegistReq;
import com.moi.anitime.exception.member.*;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {
<<<<<<< backend/src/main/java/com/moi/anitime/model/service/member/MemberServiceImpl.java
    private final MemberRepo memberRepo;
    private final PasswordEncoder passwordEncoder;
    private final S3Uploader s3Uploader;
    @Value("${shelterMember.evidence.path}")
    private String imgPath;
    @Value("${kakao.client.id}")
    private String kakao_client_id;

    @Override
    public void registGeneralMember(GeneralMemberRegistReq memberRegistReq) throws ExistEmailException {
        if (memberRepo.findByEmail(memberRegistReq.getEmail()).isPresent()) throw new ExistEmailException();
        Member member = memberRegistReq.toEntity(passwordEncoder);
        memberRepo.save(member);
    }

    @Override
    public void registShelterMember(ShelterMemberRegistReq memberRegistReq, MultipartFile image) throws IOException, SQLException {
        if (memberRepo.findByEmail(memberRegistReq.getEmail()).isPresent()) throw new ExistEmailException();
        String storedFileName = s3Uploader.upload(image, imgPath);
        Member member = memberRegistReq.toEntity(passwordEncoder, storedFileName);
        memberRepo.save(member);
    }

    @Override
    public Member login(MemberLoginReq memberLoginReq) throws NonExistEmailException {
        Member member = memberRepo.findByEmail(memberLoginReq.getEmail()).orElseThrow(NonExistEmailException::new);
        if (!passwordEncoder.matches(memberLoginReq.getPassword(), member.getPassword()))
            throw new PasswordIncorrectException();
        if (member.getMemberKind() != memberLoginReq.getMemberKind()) throw new NonExistEmailException();
        return member;
    }

    @Override
    public Member getMemberByKakaoAccessToken(String code) throws IOException {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        StringBuilder sb = new StringBuilder();
        sb.append("grant_type=authorization_code");
        sb.append("&client_id=" + kakao_client_id);
        sb.append("&redirect_uri=http://localhost:3000/kakaoLogin");
        sb.append("&code=" + code);
        bw.write(sb.toString());
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

        access_Token = element.getAsJsonObject().get("access_token").getAsString();
        refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
        System.out.println("access_token : " + access_Token);
        System.out.println("refresh_token : " + refresh_Token);

        Member member = getMemberByKaKaoEmail(access_Token);

        br.close();
        bw.close();
        return member;
    }

    private Member getMemberByKaKaoEmail(String accessToken) throws SnsNotConnectedMemberException, NonExistEmailException, IOException {
        String email = "";
        String postURL = "https://kapi.kakao.com/v2/user/me";

        URL url = new URL(postURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");

        conn.setRequestProperty("Authorization", "Bearer " + accessToken);

        int responseCode = conn.getResponseCode();
        System.out.println("responseCode : " + responseCode);

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        StringBuilder result = new StringBuilder();

        while ((line = br.readLine()) != null) {
            result.append(line);
        }

        JsonElement element = JsonParser.parseString(result.toString());
        JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
        email = kakaoAccount.getAsJsonObject().get("email").getAsString();
        System.out.println(email);
        Optional<GeneralMember> member = memberRepo.findMemberByEmail(email);
        if (!member.isPresent()) throw new NonExistEmailException();
        if(!member.get().isSnsCheck()) throw new SnsNotConnectedMemberException();
        GeneralMember newMember = member.get();
        newMember.setSnsToken(accessToken);
        memberRepo.save(newMember);
//        memberRepo.updateSnsTokenByMemberNo(accessToken, member.get().getMemberNo());
        return newMember;
    }

    @Override
    public Member findGeneralMemberById(int memberNo) throws NonExistMemberNoException {
        Optional<GeneralMember> member = memberRepo.findGeneralMemberByMemberNo(memberNo);
        if (!member.isPresent()) throw new NonExistMemberNoException();
        return member.get();
    }

    @Override
	public void editGeneralMember(int memberNo, MemberEditReq memberEditReq) throws EditInfoException {
		String encodedPassword=passwordEncoder.encode(memberEditReq.getPassword());
		memberRepo.updateMemberByMemberNo(memberNo,encodedPassword, memberEditReq.getName());
	}

    @Override
    public Member findShelterMemberById(int memberNo) throws NonExistMemberNoException {
        Optional<ShelterMember> member = memberRepo.findShelterMemberByMemberNo(memberNo);
        if (!member.isPresent()) throw new NonExistMemberNoException();
        return member.get();
    }

    @Override
    public List<ShelterMember> findAllShelterMember() throws NonExistMemberNoException {

        return memberRepo.findAllByMemberKind(1);
    }

    @Override
    public ShelterMember findShelterMemberByName(String name) throws NonExistMemberNoException {
        return memberRepo.findShelterMemberByNameAndMemberKind(name, 1);
    }
}