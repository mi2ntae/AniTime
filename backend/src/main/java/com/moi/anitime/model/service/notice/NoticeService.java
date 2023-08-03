package com.moi.anitime.model.service.notice;

import com.moi.anitime.api.request.notice.NoticeReq;

public interface NoticeService {
    void generateNotice(NoticeReq noticeReq);
}
