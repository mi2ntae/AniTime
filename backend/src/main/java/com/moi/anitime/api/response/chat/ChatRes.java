package com.moi.anitime.api.response.chat;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatRes {
    private int sendNo;
    private String content;
    private LocalDateTime writtenTime;
}
