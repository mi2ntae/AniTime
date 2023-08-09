package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface NoticeRepo extends JpaRepository<Notice,Integer> {
    Notice findNoticeByNoticeNo(int noticeNo);
    List<Notice> findNoticesByMemberNoOrderByNoticeTimeDesc(int memberNo);

    int countByMemberNoAndNoticeCheck(int memberNo,boolean noticeCheck);
    @Transactional
    void deleteAllByMemberNo(int memberNo);
}
