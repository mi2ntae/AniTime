package com.moi.anitime.schedule;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DataApiAnimal {
    private static final String API_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
    private static final String SERVICE_KEY = "YOUR_SERVICE_KEY"; // Replace with your actual service key

    private final RestTemplate restTemplate;

    public DataApiAnimal(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public String getData(int curPage) {
        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"pageNo="+curPage;

        // Send GET request and receive JSON response as a String
        return restTemplate.getForObject(url, String.class);
    }
}