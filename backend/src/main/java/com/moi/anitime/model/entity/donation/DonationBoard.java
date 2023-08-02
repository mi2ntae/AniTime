package com.moi.anitime.model.entity.donation;

import com.moi.anitime.model.entity.member.ShelterMember;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "donationboard")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Builder
@SuperBuilder
@ToString
public class DonationBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boardno")
    private int boardNo;        // int NOT NULL AUTO_INCREMENT,
    @Column(name = "shelterno")
    private int shelterNo;
    @ManyToOne
    @JoinColumn(name = "shelterno", insertable = false, updatable = false)
    private ShelterMember shelter;      // int NOT NULL,
    private String image1;      // varchar(255) COLLATE utf8mb4_bin NOT NULL COMMENT '썸네일용 이미지로 필수',
    private String title;       // varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
    @Column(name = "goalamount")
    private int goalAmount;     // int DEFAULT NULL,
    @Column(name = "attainamount")
    private int attainAmount;   // int DEFAULT NULL,
    @Column(name = "startat")
    private LocalDate startAt;  // datetime DEFAULT NULL,
    @Column(name = "endat")
    private LocalDate endAt;    // datetime DEFAULT NULL,
    @Column(name = "deleteat")
    private LocalDate deleteAt; // datetime DEFAULT NULL,
    private String poster;      // varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
}
