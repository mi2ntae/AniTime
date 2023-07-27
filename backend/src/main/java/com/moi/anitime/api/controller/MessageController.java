package com.moi.anitime.api.controller;

import com.moi.anitime.api.request.chat.ChatMessageReq;
import com.moi.anitime.api.response.chat.ChatRes;
import com.moi.anitime.model.entity.chat.ChatMessage;
import com.moi.anitime.model.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessagingTemplate smso;
    private final ChatService chatService;
    @MessageMapping("/message")
    public void message(ChatMessageReq message) {
        ChatRes chat = chatService.sendChat(message);
        System.out.println(message.getContent());
        smso.convertAndSend("/sub/"+message.getRoomNo(), chat);
    }
}
