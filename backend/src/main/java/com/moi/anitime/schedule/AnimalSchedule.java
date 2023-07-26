package com.moi.anitime.schedule;

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
public class AnimalSchedule {
    @Value("${openApi.secret}")
    private String serviceKey;


    @Autowired
    private final DataApiAnimal dataApiClient;

    public AnimalSchedule(DataApiAnimal dataApiAnimal) {
        this.dataApiClient = dataApiAnimal;
    }
    @Scheduled(cron = "59 23 * * * *")
    public void inputAnimal(){
        //Get요청을 통한 OPenAPI가져오기
        String jsonData = dataApiClient.getData(1);

        System.out.println(jsonData);
    }
}
