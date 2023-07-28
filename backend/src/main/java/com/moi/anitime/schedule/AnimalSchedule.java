package com.moi.anitime.schedule;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class AnimalSchedule {


    private DataApiAnimal dataApiClient;

    public AnimalSchedule(DataApiAnimal dataApiAnimal) {
        this.dataApiClient = dataApiAnimal;
    }
//    @Scheduled(cron = "59 23 * * * *")
    public void inputAnimal() throws InterruptedException {
        //Get요청을 통한 OPenAPI가져오기, 우리 회원이 관리하는 보호소 데이터만 가져오기
        String jsonData = dataApiClient.getData(1);

    }
}
