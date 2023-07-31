package com.moi.anitime.schedule;

import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.service.member.MemberService;
import com.moi.anitime.schedule.dto.AnimalDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataApiAnimal {
    private static final String API_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";

    private static final String SERVICE_KEY = "CIph4Ep9WZIczZRzxN3VnWaqSnt22CGUzr0ykamQMkhFmozlHUowzXKwYrYJKpNAdkfaBrwZakZoFCoIc9gVkQ=="; // Replace with your actual service key


    private final RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();

    private RestTemplate restTemplate = restTemplateBuilder.build() ;

    private final MemberService memberServiceImpl;


    /*
    * 이상적인 방법
    * 1. 보호소 이름을 전부 가져온다
    * 2. openapi의 최대 길이를 확인한다
    * 3. 최대 길이만큼 반복문을 설정한다
    * 4. 객체마다 비교를 해서 넣는다
    * */
    public List<AnimalDto> getData(Long curPage) throws InterruptedException {


        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"&pageNo="+curPage;

        // Send GET request and receive JSON response as a String
        String data =  restTemplate.getForObject(url, String.class);

        JSONParser jsonParser = new JSONParser();
        JSONArray animalOrigin = null;
        try {

            Object obj = jsonParser.parse(data);

            //Json parsing
            JSONObject jsonObj = (JSONObject) obj;
            jsonObj = (JSONObject)jsonObj.get("response");
            jsonObj = (JSONObject)jsonObj.get("body");
            jsonObj = (JSONObject)jsonObj.get("items");
            animalOrigin = (JSONArray)jsonObj.get("item");
            System.out.println(animalOrigin.size());
        }catch (ParseException e){
            System.out.println("OpenData API ERROR");
        }


        List<AnimalDto> animalDtoList = new ArrayList<>();

            for(int i = 0 ; i < animalOrigin.size();i++){
                Map<String,String> cur = (Map)animalOrigin.get(0);

                animalDtoList.add(new AnimalDto(
                        Long.parseLong(cur.get("desertionNo")),cur.get("filename"),cur.get("happenDt"),
                        cur.get("happenPlace"),cur.get("kindCd"),cur.get("colorCd"),
                        cur.get("age"),Float.parseFloat(cur.get("weight")),cur.get("noticeNo"),
                        cur.get("noticeSdt"),cur.get("noticeEdt"),cur.get("popfile"),
                        cur.get("processState"),cur.get("sexCd"),cur.get("neuterYn").charAt(0),
                        cur.get("specialMark"),cur.get("careNm"),cur.get("careTel"),
                        cur.get("careAddr"),cur.get("orgNm"),cur.get("orgNm"),
                        cur.get("chargeNm")
                               ));


        }
        return animalDtoList;
    }

    public List<AnimalDto> checkShelter(List<AnimalDto> inputAnimalList, List<ShelterMember> shelterMemberList){
        List<AnimalDto> animalDtoList = new ArrayList<>();
        for(AnimalDto curAnimal : inputAnimalList){
            for(ShelterMember curShelter :  shelterMemberList){
                if(curShelter.getName().equals(curAnimal.getCareNm())){
                    animalDtoList.add(curAnimal);
                }
            }
        }
        return animalDtoList;
    }
    public void insertDB(List<AnimalDto> animalDtoList){

    }
    public long getPageCnt() throws InterruptedException {
//        System.out.println(SERVICE_KEY);
        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"&pageNo=1";
        String data = restTemplate.getForObject(url, String.class);

        long cnt = -1;

        try {
            JSONParser jsonParser = new JSONParser();

            Object obj = jsonParser.parse(data);
//            System.out.println(data);
            //Json parsing
            JSONObject jsonObj = (JSONObject) obj;
            jsonObj = (JSONObject)jsonObj.get("response");
            jsonObj = (JSONObject)jsonObj.get("body");
            cnt = (long)jsonObj.get("totalCount");

        }catch (ParseException e){
            e.printStackTrace();
        }
        System.out.println(cnt);
        return cnt;
    }
}
