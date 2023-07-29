package com.moi.anitime.schedule;

import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataApiAnimal {
    private static final String API_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";

    private static final String SERVICE_KEY = "CIph4Ep9WZIczZRzxN3VnWaqSnt22CGUzr0ykamQMkhFmozlHUowzXKwYrYJKpNAdkfaBrwZakZoFCoIc9gVkQ=="; // Replace with your actual service key

    private  RestTemplate restTemplate ;
    private  MemberService memberServiceImpl;



    public String getData(int curPage) throws InterruptedException {
        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"&pageNo="+curPage;

        // Send GET request and receive JSON response as a String
        String data =  restTemplate.getForObject(url, String.class);

        try {
            JSONParser jsonParser = new JSONParser();

            Object obj = jsonParser.parse(data);

            //Json parsing
            JSONObject jsonObj = (JSONObject) obj;
            jsonObj = (JSONObject)jsonObj.get("response");
            jsonObj = (JSONObject)jsonObj.get("body");
            jsonObj = (JSONObject)jsonObj.get("items");
            JSONArray animalOrigin = (JSONArray)jsonObj.get("item");
            System.out.println(animalOrigin.size());
        }catch (ParseException e){
            e.printStackTrace();
        }

        //List<ShelterMember> shelterMemberList = memberServiceImpl.findAllShelterMember();

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
