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
    @Column(name="processstate")
    String processState;
    float lat;
    float lon;

    public Animal(long desertionNo, LocalDate findDate, String findPlace, String kind, String color, char sexcd, int age, float weight, String specialMark, char neutral, String noticeNo, LocalDate noticeSdate, LocalDate noticeEdate, String processState,String image1, String image2) {
        this.desertionNo = desertionNo;
        this.findDate = findDate;
        this.findPlace = findPlace;
        this.processState = processState;
        this.kind = kind;
        this.color = color;
        this.sexcd = sexcd;
        this.age = age;
        this.weight = weight;
        this.specialMark = specialMark;
        this.neutral = neutral;
        this.noticeNo = noticeNo;
        this.noticeSdate = noticeSdate;
        this.noticeEdate = noticeEdate;
        this.image1 = image1;
        this.image2 = image2;
    }
}
