package com.moi.anitime.model.service.notice;

import com.moi.anitime.api.request.notice.NoticeReq;
import com.moi.anitime.exception.notice.NoticeGenerationException;
import com.moi.anitime.model.entity.notice.Notice;

import java.util.List;

public interface NoticeService {
    void generateNotice(NoticeReq noticeReq) throws NoticeGenerationException;
    List<Notice> getNoticeList(int memberNo);
    void readNotice(int noticeNo);
    int countUnreadedNotice(int noticeNo);
    void deleteAllNotice(int memberNo);
}
