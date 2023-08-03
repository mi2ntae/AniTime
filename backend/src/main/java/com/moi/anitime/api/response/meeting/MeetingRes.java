package com.moi.anitime.api.response.meeting;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.meeting.Meeting;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MeetingRes {
    private Meeting meet;
    private String adoptionForm;

}
