package com.moi.anitime.model.entity.notice;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noticeno")
    int noticeNo;
    @Column(name = "memberno")
    int memberNo;
    @Column(name = "noticekind")
    int noticeKind;
    @Column(name = "noticetime")
    LocalDateTime noticeTime;
    @Column(name = "noticecontent")
    String noticeContent;
    @Column(name = "noticecheck")
    boolean noticeCheck;
}
