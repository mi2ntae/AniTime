package com.moi.anitime.api.request.chat;

import com.moi.anitime.model.entity.chat.ChatMessage;
import com.moi.anitime.model.entity.chat.ChatRoom;
import com.moi.anitime.model.entity.member.Member;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class ChatMessageReq {
    private int roomNo;
    private int sendNo;
    private String content;

    public ChatMessage toEntity(ChatRoom room, Member sender){
        return ChatMessage.builder()
                .chatRoom(room)
                .content(this.content)
                .type(0)
                .sender(sender)
                .isread(false).build();
    }
}


