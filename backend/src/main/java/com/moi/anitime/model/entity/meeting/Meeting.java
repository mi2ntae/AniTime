package com.moi.anitime.model.entity.meeting;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meetno")
    int meetNo;
    @Column(name = " generalno")
    int generalNo;
    @Column(name = " desertionno")
    long desertionNo;
    @Column(name = " reserveddate")
    LocalDateTime reservedDate;
    int status;
    String url;
    String reason;
}
