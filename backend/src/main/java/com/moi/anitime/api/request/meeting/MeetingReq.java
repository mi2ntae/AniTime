package com.moi.anitime.api.request.meeting;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("meetingReq")
public class MeetingReq {
    int desertionNo;
    int generalNo;
    String img;
    String reservedDate;
}
