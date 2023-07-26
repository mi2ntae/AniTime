package com.moi.anitime.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
public class MessageController {
//    private final SimpMessagingTemplate smso;
//    private final ChatService service;
//
//    @MessageMapping("/message")
//    public void message(ChatMessage message) throws SQLException {
//        service.addChat(message);
//        smso.convertAndSend("/sub/"+message.getRoomId(), message);
//    }

}
