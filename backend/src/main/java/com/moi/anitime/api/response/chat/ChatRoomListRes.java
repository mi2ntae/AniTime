package com.moi.anitime.api.response.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomListRes {
    private int roomNo;
    private String name;
    private String lastMsg;
    private int unreadCnt;
}
