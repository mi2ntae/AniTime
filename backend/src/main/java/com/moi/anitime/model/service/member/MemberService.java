package com.moi.anitime.model.service.member;

import com.moi.anitime.api.request.member.MemberLoginReq;
import com.moi.anitime.api.request.member.GeneralMemberRegistReq;
import com.moi.anitime.api.request.member.ShelterMemberRegistReq;
import com.moi.anitime.exception.member.ExistEmailException;
import com.moi.anitime.exception.member.NoExistMemberNoException;
import com.moi.anitime.exception.member.NonExistEmailException;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MemberService {
	void registGeneralMember(GeneralMemberRegistReq memberRegistReq) throws ExistEmailException;
	void registShelterMember(ShelterMemberRegistReq registMember, MultipartFile image) throws IOException, SQLException;
	Member login(MemberLoginReq memberLoginReq) throws NonExistEmailException;
	Member findGeneralMemberById(int memberNo) throws NoExistMemberNoException;
	void editGeneralMember(int memberNo,GeneralMember requestMember);
}
