package com.moi.anitime.api.request.notice;

import com.moi.anitime.model.entity.notice.Notice;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@ApiModel("noticeReq")
public class NoticeReq {
    int generalNo;
    int shelterNo;
    int noticeKind;
    int status;
    LocalDateTime reservedDate;
    int amount;

    public Notice toEntity(String noticeContent) {
        Notice notice=Notice.builder()
                .memberNo(this.memberNo)
                .noticeKind(this.noticeKind)
                .noticeTime(LocalDateTime.now())
                .noticeContent(noticeContent)
                .noticeCheck(false)
                .build();
        return notice;
    }

    public Notice toEntity(int memberNo, String noticeContent) {
        Notice notice=Notice.builder()
                .memberNo(memberNo)
                .noticeKind(this.noticeKind)
                .noticeTime(LocalDateTime.now())
                .noticeContent(noticeContent)
                .noticeCheck(false)
                .build();
        return notice;
    }
}
