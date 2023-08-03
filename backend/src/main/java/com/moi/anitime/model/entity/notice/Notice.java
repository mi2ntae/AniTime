package com.moi.anitime.model.entity.notice;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
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
    int noticeKind;
    LocalDateTime noticeTime;
    String noticeContent;
    boolean noticeCheck;
}
