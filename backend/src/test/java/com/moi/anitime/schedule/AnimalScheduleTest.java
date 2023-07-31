package com.moi.anitime.schedule;

import com.moi.anitime.model.entity.animal.Animal;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.sql.SQLOutput;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AnimalScheduleTest {
    private final RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();

    private RestTemplate restTemplate = restTemplateBuilder.build() ;
    private static final String KAKAO_SERVICE_KEY = "9326b022f047dd4e819b116ae72e3576";

    private static final String KAKAO_API_URL = "https://dapi.kakao.com/v2/local/search/address.json";

//
//    @Autowired
    @Autowired
    private DataApiAnimal dataApiAnimal; // MockBean을 사용하여 테스트용 더미 객체 생성
//
    @Test
    void apicall() throws InterruptedException {
//
//        System.out.println(dataApiAnimal.getData(1L).size());
    }
    @Test
    void apiCnt() throws InterruptedException, ParseException {
//        String url = KAKAO_API_URL + "?size=1&query=" + "수원시";
//
//        // Send GET request and receive JSON response as a String
//        //여기서 파싱해온 데이터를 기반으로
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization","KakaoAK "+KAKAO_SERVICE_KEY);
//        HttpEntity request = new HttpEntity(headers);
//        ResponseEntity<String> response = restTemplate.exchange(
//                url ,
//                HttpMethod.GET,
//                request,
//                String.class
//        );
//        System.out.println(response.getBody());
//        JSONParser jsonParser = new JSONParser();
//        Object obj = null;
//        try {
//            obj = jsonParser.parse(response.getBody());
//        } catch (ParseException e) {
//            System.out.println("parsing Error not Found Parsing Data");
//            return;
//        }
//        JSONObject jsonObject = (JSONObject) obj;
//        JSONObject jsonObjectmeta = (JSONObject)jsonObject.get("meta");
//        long totalCount = (long)jsonObjectmeta.get("total_count");
//        System.out.println(totalCount);
//        if(totalCount==0){
//            response = restTemplate.exchange(
//                    url ,
//                    HttpMethod.GET,
//                    request,
//                    String.class
//            );
//            jsonParser = new JSONParser();
//
//            try {
//                obj = jsonParser.parse(response.getBody());
//            } catch (ParseException e) {
//                System.out.println("parsing Error not Found Parsing Data");
////                return null;
//            }
//            jsonObject = (JSONObject) obj;
//            jsonObjectmeta = (JSONObject)jsonObject.get("meta");
//            totalCount = (long)jsonObjectmeta.get("total_count");
//            if(totalCount==0){
//                //todo : ssafy 기본 주소로 설정해서 anialentity를 설정해준다 -> 이건 보호소마저도
//                //위경도 검색에서 0이 나오는 경우
//                System.out.println("error!!!!!!!");
//                return;
////                continue;
//            }
//
//        }
//
//        JSONArray jsonObjectDoc = (JSONArray) jsonObject.get("documents");
//        JSONObject doc = (JSONObject) jsonObjectDoc.get(0);
//        System.out.println(doc.get("x").toString()+doc.get("y").toString());
//        //x : lon;
//        //y : lat

    }

}