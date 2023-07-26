package com.moi.anitime.model.entity.animal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "desertionno")
    int desertionNo;
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
    int weight;
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
    BigDecimal lat;
    BigDecimal lon;
}
