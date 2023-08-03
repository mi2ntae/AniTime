package com.moi.anitime.model.service.meeting;

import com.moi.anitime.api.request.meeting.MeetingReq;
import com.moi.anitime.api.response.meeting.MeetingListRes;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MeetingService {
    public void reserveMeeting(MeetingReq meetingReq, MultipartFile img) throws IOException;

    public Page<MeetingListRes> findMeetingByGeneralNo(int generalNo, int page);

}
