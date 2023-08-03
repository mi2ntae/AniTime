package com.moi.anitime.api.request.meeting;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("meetingStatusReq")
public class MeetingStatusReq {
    private boolean status;
    private String reason;
}
