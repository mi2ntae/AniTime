package com.moi.anitime.api.response.chat;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatMeetRes {
    private int roomNo;
    private String generalName;
    private String shelterName;
}
