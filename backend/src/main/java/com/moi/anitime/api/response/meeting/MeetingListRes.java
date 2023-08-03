package com.moi.anitime.api.response.meeting;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MeetingListRes {
    private int meetNo;
    private String shelterName;
    private String meetContent;
    private long desertionNo;
    private String reservedDate;
    private int state;
}
