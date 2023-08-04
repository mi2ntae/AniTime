package com.moi.anitime.model.service.notice;

import com.moi.anitime.api.request.notice.NoticeReq;
import com.moi.anitime.exception.notice.NoticeGenerationException;

public interface NoticeService {
    void generateNotice(NoticeReq noticeReq) throws NoticeGenerationException;
}
