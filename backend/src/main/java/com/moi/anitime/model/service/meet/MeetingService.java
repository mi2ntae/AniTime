package com.moi.anitime.model.service.meet;

import com.moi.anitime.api.request.meeting.MeetingReq;
import com.moi.anitime.api.request.meeting.MeetingStatusReq;
import com.moi.anitime.api.response.meeting.MeetingListRes;
import com.moi.anitime.api.response.meeting.MeetingRes;
import com.moi.anitime.exception.meeting.NonExistMeetNoException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.meeting.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface MeetingService {
    public void reserveMeet(MeetingReq meetingReq, MultipartFile img) throws IOException;

    public Page<MeetingListRes> findMeetsByMemberNo(int memberNo, int page);

    public MeetingRes findMeetByMeetNo(int meetNo);

    public void setMeetState(int memberNo, MeetingStatusReq meetingStatusReq) throws NonExistMeetNoException;

    public int countMeetsByNow(int memberNo) throws NonExistMemberNoException;

    public Map<Integer, Boolean> getPossibleTime(int shelterNo, int month, int day);
}
