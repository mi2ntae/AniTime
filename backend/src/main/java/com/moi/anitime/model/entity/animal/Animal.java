package com.moi.anitime.model.entity.animal;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "desertionno")
    long desertionNo;
    @Column(name = "shelterno")
    int shelterNo;

    @Column(name="finddate")
    LocalDate findDate;

    @Column(name="findplace")
    String findPlace;
    String kind;
    String color;
    char sexcd;
    int age;
    float weight;
    @Column(name="specialmark")
    String specialMark;
    char neutral;
    @Column(name="noticeno")
    String noticeNo;

    @Column(name="noticesdate")
    LocalDate noticeSdate;
    @Column(name="noticeedate")
    LocalDate noticeEdate;
    String image1;
    String image2;
    float lat;
    float lon;
}
