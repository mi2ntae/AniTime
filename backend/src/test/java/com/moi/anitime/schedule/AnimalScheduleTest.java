package com.moi.anitime.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;

import static org.junit.jupiter.api.Assertions.*;

class AnimalScheduleTest {

    RestTemplateBuilder restTemplateBuilder;
    private DataApiAnimal dataApiClient = new DataApiAnimal(restTemplateBuilder); // MockBean을 사용하여 테스트용 더미 객체 생성

}