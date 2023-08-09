package com.moi.anitime.schedule;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.api.response.profile.ProfileRes;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.service.animal.AnimalService;
import com.moi.anitime.model.service.member.MemberService;
import com.moi.anitime.model.service.profile.ProfileService;
import com.moi.anitime.schedule.dto.AnimalDto;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.sql.SQLOutput;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AnimalScheduleTest {
//    private final RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder()
    @Autowired
    private ProfileService profileService;
    @Autowired
    private AnimalService animalService;
    @Autowired
    private ResponseService responseService;

//    @Test
//    void apitest(){
//        ProfileRes profileInfo = profileService.findProfileByIdSystem(2);
//        System.out.println(profileInfo.toString());
//        //필요한 정보를 profileService에 전달해준다.
//        List<AnimalPreviewRes> tmp = animalService.getAnimalRecommand(profileInfo);
//        System.out.println(tmp.size());
//        for(AnimalPreviewRes a : tmp){
//            System.out.println(a.toString());
//        }
//        System.out.println("@!#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
//
//        System.out.println(responseService.getListResponse(animalService.getAnimalRecommand(profileInfo)));
//        System.out.println(responseService.getListResponse());
//        System.out.println(responseService.getListResponse)
//    }
//    private RestTemplate restTemplate = restTemplateBuilder.build() ;
//    private static final String KAKAO_SERVICE_KEY = "9326b022f047dd4e819b116ae72e3576";
//
//    private static final String KAKAO_API_URL = "https://dapi.kakao.com/v2/local/search/address.json";
//
////
////    @Autowired
//    @Autowired
//    private DataApiAnimal dataApiClient; // MockBean을 사용하여 테스트용 더미 객체 생성
//    @Autowired
//    private MemberService memberServiceImpl;
//    @Test
//    void apicall() throws InterruptedException {
////
////        System.out.println(dataApiAnimal.getData(1L).size());
//    }
//    @Test
//    @Transactional
//    void apiCnt() throws InterruptedException, ParseException {
//
//        List<ShelterMember> shelterMemberList = memberServiceImpl.findAllShelterMember();
//        System.out.println("shelter member Count : "+ shelterMemberList.size());
//        for(ShelterMember shelterMember : shelterMemberList){
//            String name= shelterMember.getName();
//            System.out.print(name+",");
//
//        }
//        List<AnimalDto> animalDtoList = dataApiClient.getData(64L);
//        //1000개씩 나눠서 동작을 진행해줘야한다.
//        //1000개에서 보호소에 있는 개체만을 찾아준다.
//        System.out.println("149 get data succed");
//        List<AnimalDto> animalcheckList = dataApiClient.checkShelter(animalDtoList,shelterMemberList);
//        System.out.println("animalcheckList size :" + animalcheckList.size());
//        //
//        if(animalcheckList.size()==0) {
//            System.out.println("checkList size is 0");
//            System.out.println( "149 page data input succed");
//
//            return;}
//        System.out.println(149+" shelter fliter succed");
//        List<Animal> dataType = dataApiClient.splitData(animalcheckList);
//
//        System.out.println("lonlat entity set up succed");
//
//        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
//        for(Animal animal : dataType){
//            System.out.println(animal.toString());
//        }
//        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
//        dataApiClient.insertDB(dataType);
//        System.out.println(149 + " page data input succed");
//        //        LocalDate now = LocalDate.now();
////        // 연도, 월(문자열, 숫자), 일, 일(year 기준), 요일(문자열, 숫자)
////        int year = now.getYear();
////        int monthValue = now.getMonthValue();
////        int dayOfMonth = now.getDayOfMonth();
////        String endDate = Integer.toString(year) + (monthValue<10 ? "0" :"")+Integer.toString(monthValue) +  (dayOfMonth<10 ? "0" :"")+Integer.toString(dayOfMonth);
////        String startDate = Integer.toString(year-2) +  (monthValue<10 ? "0" :"")+Integer.toString(monthValue) +  (dayOfMonth<10 ? "0" :"")+Integer.toString(dayOfMonth);
////        System.out.println(startDate);
////        String url = KAKAO_API_URL + "?size=1&query=" + "수원시";
////
////        // Send GET request and receive JSON response as a String
////        //여기서 파싱해온 데이터를 기반으로
////        HttpHeaders headers = new HttpHeaders();
////        headers.set("Authorization","KakaoAK "+KAKAO_SERVICE_KEY);
////        HttpEntity request = new HttpEntity(headers);
////        ResponseEntity<String> response = restTemplate.exchange(
////                url ,
////                HttpMethod.GET,
////                request,
////                String.class
////        );
////        System.out.println(response.getBody());
////        JSONParser jsonParser = new JSONParser();
////        Object obj = null;
////        try {
////            obj = jsonParser.parse(response.getBody());
////        } catch (ParseException e) {
////            System.out.println("parsing Error not Found Parsing Data");
////            return;
////        }
////        JSONObject jsonObject = (JSONObject) obj;
////        JSONObject jsonObjectmeta = (JSONObject)jsonObject.get("meta");
////        long totalCount = (long)jsonObjectmeta.get("total_count");
////        System.out.println(totalCount);
////        if(totalCount==0){
////            response = restTemplate.exchange(
////                    url ,
////                    HttpMethod.GET,
////                    request,
////                    String.class
////            );
////            jsonParser = new JSONParser();
////
////            try {
////                obj = jsonParser.parse(response.getBody());
////            } catch (ParseException e) {
////                System.out.println("parsing Error not Found Parsing Data");
//////                return null;
////            }
////            jsonObject = (JSONObject) obj;
////            jsonObjectmeta = (JSONObject)jsonObject.get("meta");
////            totalCount = (long)jsonObjectmeta.get("total_count");
////            if(totalCount==0){
////                //todo : ssafy 기본 주소로 설정해서 anialentity를 설정해준다 -> 이건 보호소마저도
////                //위경도 검색에서 0이 나오는 경우
////                System.out.println("error!!!!!!!");
////                return;
//////                continue;
////            }
////
////        }
////
////        JSONArray jsonObjectDoc = (JSONArray) jsonObject.get("documents");
////        JSONObject doc = (JSONObject) jsonObjectDoc.get(0);
////        System.out.println(doc.get("x").toString()+doc.get("y").toString());
////        //x : lon;
////        //y : lat

//    }

}