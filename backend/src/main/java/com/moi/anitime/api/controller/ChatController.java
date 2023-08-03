package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.chat.ChatMessageReq;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.api.response.chat.ChatRes;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.model.entity.chat.ChatMessage;
import com.moi.anitime.model.service.chat.ChatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@Api(value = "채팅 API", tags = {"Chat"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ResponseService responseService;
    private final ChatService chatService;

    @ApiOperation(value = "채팅방 목록 조회", notes = "회원 번호로 채팅방 목록 조회")
    @GetMapping("/room/{memberKind}/{memberNo}")
    public ListResponse getChatRoomsByMemberNo(@PathVariable int memberKind, @PathVariable int memberNo) {
        return responseService.getListResponse(chatService.getRoomsByMemberNo(memberKind, memberNo));
    }

    @ApiOperation(value = "채팅방 입장", notes = "회원번호, 유기번호로 채팅방 입장 or 생성")
    @PostMapping("/room")
    public SingleResponse initChatRoom(@RequestParam("generalNo") int generalNo, @RequestParam("desertionNo") long desertionNo) throws NonExistDesertionNoException {
        return responseService.getSingleResponse(chatService.initChatRoom(generalNo, desertionNo));
    }

    @ApiOperation(value = "채팅 내역 조회", notes = "채팅방 번호로 채팅 내역 조회")
    @GetMapping("/room/{roomNo}")
    public ListResponse getChatsByRoomNo(@PathVariable int roomNo, @RequestParam("memberNo") int memberNo) {
        return responseService.getListResponse(chatService.enterChatRoom(memberNo, roomNo));
    }


}

