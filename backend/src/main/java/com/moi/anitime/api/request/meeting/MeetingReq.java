package com.moi.anitime.api.request.meeting;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.meeting.Meeting;
import com.moi.anitime.model.entity.member.Member;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("meetingReq")
public class MeetingReq {
    long desertionNo;
    int generalNo;
    String reservedDate;

    public Meeting toEntity(Animal desertion, Member member){
        return Meeting.builder()
                .animal(desertion)
                .member(member)
                .reservedDate(LocalDateTime.parse(this.reservedDate))
                .status(0)
                .build();
    }
}
