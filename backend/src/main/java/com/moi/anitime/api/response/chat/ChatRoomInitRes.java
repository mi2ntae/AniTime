package com.moi.anitime.api.response.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomInitRes {
    private int roomNo;
    private List<ChatRes> chatMessage;
}
