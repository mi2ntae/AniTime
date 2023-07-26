package com.moi.anitime.model.service.chat;

import com.moi.anitime.api.request.member.GeneralMemberRegistReq;
import com.moi.anitime.api.request.member.MemberLoginReq;
import com.moi.anitime.api.request.member.ShelterMemberRegistReq;
import com.moi.anitime.api.response.ChatRoomResponse;
import com.moi.anitime.exception.member.*;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.repo.ChatRoomRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.model.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@RequiredArgsConstructor
@Service
@Slf4j

public class ChatServiceImpl implements ChatService {
	private final ChatRoomRepo memberRepo;


	@Override
	public List<ChatRoomResponse> getRoomsByMemberNo(int memberNo) {
		return memberRepo.findChatRoomsByGeneralNo(memberNo);
	}
}