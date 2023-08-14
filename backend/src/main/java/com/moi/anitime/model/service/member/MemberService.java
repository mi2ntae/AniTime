package com.moi.anitime.model.service.member;

import com.moi.anitime.api.request.member.MemberEditReq;
import com.moi.anitime.api.request.member.MemberLoginReq;
import com.moi.anitime.api.request.member.GeneralMemberRegistReq;
import com.moi.anitime.api.request.member.ShelterMemberRegistReq;
import com.moi.anitime.exception.member.*;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MemberService {
	void registGeneralMember(GeneralMemberRegistReq memberRegistReq) throws ExistEmailException;
	void registShelterMember(ShelterMemberRegistReq registMember, MultipartFile image) throws IOException, SQLException;
	Member login(MemberLoginReq memberLoginReq) throws NonExistEmailException;
	Member findGeneralMemberById(int memberNo) throws NonExistMemberNoException;
	Member findShelterMemberById(int memberNo) throws NonExistMemberNoException;
	void editGeneralMemberPW(int memberNo, MemberEditReq memberEditReq) throws EditInfoException;
	void editGeneralMemberCheck(int memberNo) throws EditInfoException;
	List<ShelterMember> findAllShelterMember() throws NonExistMemberNoException;
	ShelterMember findShelterMemberByName(String name) throws NonExistMemberNoException;
	Member getMemberByKakaoAccessToken(String code) throws SnsNotConnectedMemberException, NonExistEmailException, IOException;
	void logout(int memberNo) throws IOException;

	void deleteMember(int memberNo);
}
