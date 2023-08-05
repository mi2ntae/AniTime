package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepo extends JpaRepository<Notice,Integer> {
    Notice findNoticeByNoticeNo(int noticeNo);
    List<Notice> findNoticesByMemberNoAndNoticeCheck(int memberNo,boolean noticeCheck);

    int countByMemberNoAndNoticeCheck(int memberNo,boolean noticeCheck);
    void deleteAllByMemberNo(int memberNo);
}
