package com.moi.anitime.model.entity.meeting;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int meetNo;
    int generalNo;
    long desertionNo;
    LocalDate reservedDate;
    int status;
    String url;
    String reason;
}
