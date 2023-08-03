package com.moi.anitime.api.response.meeting;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MeetingListRes {
    private int meetNo;
    private String name;
    private String meetContent;
    private long desertionNo;
    private LocalDateTime reservedDate;
    private int state;
    private String url;
}
