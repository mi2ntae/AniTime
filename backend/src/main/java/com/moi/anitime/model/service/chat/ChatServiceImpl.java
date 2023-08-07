package com.moi.anitime.model.service.chat;

import com.moi.anitime.api.request.chat.ChatMessageReq;
import com.moi.anitime.api.response.chat.ChatRes;
import com.moi.anitime.api.response.chat.ChatRoomInitRes;
import com.moi.anitime.api.response.chat.ChatRoomListRes;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.exception.chat.UnknownMemberKindException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.chat.ChatMessage;
import com.moi.anitime.model.entity.chat.ChatRoom;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.MemberKind;
import com.moi.anitime.model.repo.AnimalRepo;
import com.moi.anitime.model.repo.ChatMessageRepo;
import com.moi.anitime.model.repo.ChatRoomRepo;
import com.moi.anitime.model.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@RequiredArgsConstructor
@Service
@Slf4j

public class ChatServiceImpl implements ChatService {
	private final ChatRoomRepo chatRoomRepo;
	private final ChatMessageRepo chatMessageRepo;
	private final AnimalRepo animalRepo;
	private final MemberRepo memberRepo;

	private final String FIRST_MESSAGE = "유기번호 :  ";
	private final String LAST_MESSAGE = " 의 채팅이 시작되었습니다.";
	@Override
	public List<ChatRoomListRes> getRoomsByMemberNo(int memberKind, int memberNo) throws UnknownMemberKindException {
		if(memberKind == MemberKind.GENERAL.getCode()) return chatRoomRepo.findChatRoomsByGeneralNo(memberNo);
		else if(memberKind == MemberKind.SHELTER.getCode()) return chatRoomRepo.findChatRoomsByShelterNo(memberNo);
		else throw new UnknownMemberKindException();
	}

	@Transactional
	@Override
	public ChatRoomInitRes initChatRoom(int generalNo, long desertionNo) throws NonExistDesertionNoException{
		Optional<Animal> animal = animalRepo.findById(desertionNo);
		if(!animal.isPresent()) throw new NonExistDesertionNoException();
		int shelterNo = animal.get().getShelterNo();

		ChatRoomInitRes.ChatRoomInitResBuilder resBuilder = ChatRoomInitRes.builder();
		Member generalMember = memberRepo.getReferenceById(generalNo);
		Member shelterMember = memberRepo.getReferenceById(shelterNo);
		Optional<ChatRoom> tmpRoom = chatRoomRepo.findChatRoomByGeneralMember_MemberNoAndShelterMember_MemberNo(generalNo, shelterNo);
		ChatRoom room = null;
		if(tmpRoom.isPresent()) {
			room = tmpRoom.get();
			chatMessageRepo.updateChatMessagesRead(room.getRoomNo(), generalNo);
		}
		else {
			ChatRoom newRoom = ChatRoom.builder()
					.generalMember(generalMember)
					.shelterMember(shelterMember)
					.build();
			room = chatRoomRepo.save(newRoom);
		}
		System.out.println(room);
		ChatMessage message = ChatMessage.builder()
				.chatRoom(room)
				.sender(generalMember)
				.type(0)
				.content(FIRST_MESSAGE+animal.get().getDesertionNo()+LAST_MESSAGE)
				.isread(false).build();
		chatMessageRepo.save(message);
		resBuilder
				.roomNo(room.getRoomNo())
				.chatMessage(this.getChats(room.getRoomNo()));
		return resBuilder.build();
	}

	@Transactional
	@Override
	public List<ChatRes> enterChatRoom(int memberNo, int roomNo) throws NonExistDesertionNoException {
		chatMessageRepo.updateChatMessagesRead(roomNo, memberNo);
		return getChats(roomNo);
	}

	@Override
	public ChatRes sendChat(ChatMessageReq message) {
		ChatRoom room = chatRoomRepo.getReferenceById(message.getRoomNo());
		Member sender = memberRepo.getReferenceById(message.getSendNo());
		ChatMessage chat = message.toEntity(room, sender);
		chat = chatMessageRepo.save(chat);
		return ChatRes.builder()
				.sendNo(chat.getSender().getMemberNo())
				.content(chat.getContent())
				.writtenTime(chat.getWrittenTime()).build();
	}

	private List<ChatRes> getChats(int roomNo) {
		List<ChatRes> resChat = new ArrayList<>();
		chatMessageRepo.findChatMessageByChatRoom_RoomNoOrderByWrittenTimeAsc(roomNo).stream().forEach(chatMessage -> {
			resChat.add(ChatRes.builder()
					.chatNo(chatMessage.getChatNo())
					.sendNo(chatMessage.getSender().getMemberNo())
					.content(chatMessage.getContent())
					.writtenTime(chatMessage.getWrittenTime()).build());
		});
		return resChat;
	}
}