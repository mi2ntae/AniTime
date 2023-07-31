package com.moi.anitime.schedule;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AnimalScheduleTest {

//
//    @Autowired
    @Autowired
    private DataApiAnimal dataApiAnimal; // MockBean을 사용하여 테스트용 더미 객체 생성
//
    @Test
    void apicall() throws InterruptedException {
//
        System.out.println(dataApiAnimal.getData(1L).size());
    }
    @Test
    void apiCnt() throws InterruptedException {
    }

}