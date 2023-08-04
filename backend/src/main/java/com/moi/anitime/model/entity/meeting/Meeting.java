package com.moi.anitime.model.entity.meeting;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.member.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meetno")
    int meetNo;
    @ManyToOne
    @JoinColumn(name = "generalno")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "desertionno")
    private Animal animal;
    @Column(name = "reserveddate")
    LocalDateTime reservedDate;
    int status;
    String url;
    String reason;
}
