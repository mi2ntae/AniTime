package com.moi.anitime.schedule;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Component
public class DataApiAnimal {
    private static final String API_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";


    private String SERVICE_KEY = "CIph4Ep9WZIczZRzxN3VnWaqSnt22CGUzr0ykamQMkhFmozlHUowzXKwYrYJKpNAdkfaBrwZakZoFCoIc9gVkQ=="; // Replace with your actual service key

    private final RestTemplate restTemplate ;

    public DataApiAnimal() {
        this.restTemplate = new RestTemplate();
    }

    public String getData(int curPage) throws InterruptedException {
        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"&pageNo="+curPage;

        // Send GET request and receive JSON response as a String
        String data =  restTemplate.getForObject(url, String.class);
        return data;
    }
    public long getPageCnt() throws InterruptedException {
        System.out.println(SERVICE_KEY);
        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"&pageNo=1";
        String data = restTemplate.getForObject(url, String.class);

        long cnt = -1;

        try {
            JSONParser jsonParser = new JSONParser();

            Object obj = jsonParser.parse(data);

            //Json parsing
            JSONObject jsonObj = (JSONObject) obj;
            jsonObj = (JSONObject)jsonObj.get("response");
            jsonObj = (JSONObject)jsonObj.get("body");
            cnt = (long)jsonObj.get("totalCount");

        }catch (ParseException e){
            e.printStackTrace();
        }

        return cnt;
    }
}