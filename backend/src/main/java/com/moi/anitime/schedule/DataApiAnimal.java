package com.moi.anitime.schedule;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.service.animal.AnimalService;
import com.moi.anitime.model.service.animal.AnimalServiceImpl;
import com.moi.anitime.model.service.member.MemberService;
import com.moi.anitime.schedule.dto.AnimalDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataApiAnimal {

    private static final String API_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";

    private static final String SERVICE_KEY = "CIph4Ep9WZIczZRzxN3VnWaqSnt22CGUzr0ykamQMkhFmozlHUowzXKwYrYJKpNAdkfaBrwZakZoFCoIc9gVkQ=="; // Replace with your actual service key

    private static final String KAKAO_SERVICE_KEY = "9326b022f047dd4e819b116ae72e3576";

    private static final String KAKAO_API_URL = "https://dapi.kakao.com/v2/local/search/address.json";

    private final RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();

    private RestTemplate restTemplate = restTemplateBuilder.build() ;


    private final AnimalService animalService;
    private final MemberService memberService;


    /*
    * 이상적인 방법
    * 1. 보호소 이름을 전부 가져온다
    * 2. openapi의 최대 길이를 확인한다
    * 3. 최대 길이만큼 반복문을 설정한다
    * 4. 객체마다 비교를 해서 넣는다
    * */
    public List<AnimalDto> getData(Long curPage) throws InterruptedException {

        LocalDate now = LocalDate.now();
        // 연도, 월(문자열, 숫자), 일, 일(year 기준), 요일(문자열, 숫자)
        int year = now.getYear();
        int monthValue = now.getMonthValue()-6;
        if(monthValue<=0){
            year--;
            monthValue = (monthValue+12)%13;
        }

        int dayOfMonth = 1;
        String endDate = Integer.toString(year) + (monthValue<10 ? "0" :"")+Integer.toString(monthValue) +  (dayOfMonth<10 ? "0" :"")+Integer.toString(dayOfMonth);
        String startDate = Integer.toString(year) +  (monthValue<10 ? "0" :"")+Integer.toString(monthValue) +  (dayOfMonth<10 ? "0" :"")+Integer.toString(dayOfMonth);

        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();

        factory.setConnectTimeout(20*1000);
        factory.setReadTimeout(20 * 1000);
        restTemplate.setRequestFactory(factory);


        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"&pageNo="+curPage+"&bgnde="+startDate;

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
            System.out.println("item size : " + animalOrigin.size());
//            System.out.println(animalOrigin.size());
        }catch (Exception e){
            System.out.println(data);
            System.out.println("OpenData API ERROR");
            return new ArrayList<AnimalDto>();
        }


        List<AnimalDto> animalDtoList = new ArrayList<>();
            for(int i = 0 ; i < animalOrigin.size();i++){
                Map<String,String> cur = (Map)animalOrigin.get(i);
                String str = cur.get("weight").replaceAll(" ","");
                if(str.contains("-")||str.contains("~")) {
                    if (str.contains("~")) {
                        str = str.split("~")[0];
                    } else {
                        str = str.split("-")[0];

                    }
                }else{
                    str = str.substring(0,str.indexOf("("));
                }
                str = str.replace(",",".");
                str = str.replace("...",".");
                str = str.replace("..",".");
                str = str.replace("/","");
                str = str.replace("?","");
                str = str.replace("'","");
                str = str.replace(">","");
                str = str.replace("<","");
                str = str.replace("`","");
                str = str.replace("_","");

                String filter = str;
                try{
                    float tmp = Float.parseFloat(str);
                }catch (Exception e){
                    filter = "1";
                }
//                System.out.println(filter);
                animalDtoList.add(new   AnimalDto(
                        Long.parseLong(cur.get("desertionNo")),cur.get("filename"),cur.get("happenDt"),
                        cur.get("happenPlace"),cur.get("kindCd"),cur.get("colorCd"),
                        cur.get("age"),
                        Float.parseFloat(filter),
                        cur.get("noticeNo"),cur.get("noticeSdt"),cur.get("noticeEdt"),cur.get("popfile"),
                        cur.get("processState"),cur.get("sexCd").charAt(0),cur.get("neuterYn").charAt(0),
                        cur.get("specialMark"),cur.get("careNm"),cur.get("careTel"),
                        cur.get("careAddr"),cur.get("orgNm"),cur.get("orgNm"),
                        cur.get("chargeNm")
                               ));


        }
        return animalDtoList;
    }

    public List<AnimalDto> checkShelter(List<AnimalDto> inputAnimalList, List<ShelterMember> shelterMemberList){
        List<AnimalDto> animalDtoList = new ArrayList<>();
        System.out.println(inputAnimalList.size() + " inputAnimalList Size");
        System.out.println(shelterMemberList.size() + " inputAnimalList Size");

        for(AnimalDto curAnimal : inputAnimalList){
            for(ShelterMember curShelter :  shelterMemberList){
                if(curShelter.getName().equals(curAnimal.getCareNm())){
                    animalDtoList.add(curAnimal);
                }
            }
        }
        return animalDtoList;
    }
    public List<Animal> splitData(List<AnimalDto> animalDtoList) {
        /*
        * 여기서는 insert를 해야하는 데이터와
        * insert의 경우 해당 Dto-> Entity로 전환하기 위해서
        * 보호소 이름 값을 가져와야한다.
        * 보호소 이름을 기반으로 toEntity를 통해서 Entity로 전환이 되어야한다.
        * update해야하는 데이터로 나누어 준다.
        */
        List<Animal>  result = new ArrayList<>();

        for(AnimalDto animalDto : animalDtoList){
            if(animalService.getAnimal(animalDto.getDesertionNo()).isPresent()){
                //option객체가 있을 경우
                Animal animal = animalService.getAnimal(animalDto.getDesertionNo()).get();
                animal.setProcessState(animalDto.getProcessState());
                result.add(animal);
            }else{
                //optional.empty()인 경우

                String url = KAKAO_API_URL + "?size=1&query=" ;

                // Send GET request and receive JSON response as a String
                //여기서 파싱해온 데이터를 기반으로
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization","KakaoAK "+KAKAO_SERVICE_KEY);
                HttpEntity request = new HttpEntity(headers);
                ResponseEntity<String> response = restTemplate.exchange(
                        url+ animalDto.getHappenPlace() ,
                        HttpMethod.GET,
                        request,
                        String.class
                );
                JSONParser jsonParser = new JSONParser();
                Object obj = null;
                try {
                    obj = jsonParser.parse(response.getBody());
                } catch (ParseException e) {
                    System.out.println("parsing Error not Found Parsing Data");
                    return null;
                }
                JSONObject jsonObject = (JSONObject) obj;
                JSONObject jsonObjectmeta = (JSONObject)jsonObject.get("meta");
                long totalCount = (long)jsonObjectmeta.get("total_count");
                if(totalCount==0){
                    response = restTemplate.exchange(
                            url+ animalDto.getCareAddr() ,
                            HttpMethod.GET,
                            request,
                            String.class
                    );
                    jsonParser = new JSONParser();

                    try {
                        obj = jsonParser.parse(response.getBody());
                    } catch (ParseException e) {
                        System.out.println("parsing Error not Found Parsing Data");
                        return null;
                    }
                    jsonObject = (JSONObject) obj;
                    jsonObjectmeta = (JSONObject)jsonObject.get("meta");
                    totalCount = (long)jsonObjectmeta.get("total_count");
                    if(totalCount==0){
                        //todo : ssafy 기본 주소로 설정해서 anialentity를 설정해준다 -> 이건 보호소마저도
                        //위경도 검색에서 0이 나오는 경우
                        System.out.println("여기는 보호소 주소로 세팅하는 경우");
                        continue;
                    }

                }
                JSONArray jsonObjectDoc = (JSONArray) jsonObject.get("documents");
                JSONObject doc = (JSONObject) jsonObjectDoc.get(0);
                System.out.println(doc.get("x").toString()+doc.get("y").toString());
                //x : lon
                //y : lat
                LocalDate findDate = LocalDate.parse(animalDto.getHappenDt(), DateTimeFormatter.ofPattern("yyyyMMdd"));
                LocalDate noticeSdate = LocalDate.parse(animalDto.getNoticeSdt(), DateTimeFormatter.ofPattern("yyyyMMdd"));
                LocalDate noticeEdate = LocalDate.parse(animalDto.getNoticeEdt(), DateTimeFormatter.ofPattern("yyyyMMdd"));
                ShelterMember shelterMember = memberService.findShelterMemberByName(animalDto.getCareNm());

                Animal animal = new Animal(
                        animalDto.getDesertionNo(),
                        shelterMember.getMemberNo(),
                        findDate,
                        animalDto.getHappenPlace(),
                        animalDto.getKindCd(),
                        animalDto.getColorCd(),
                        animalDto.getSexCd(),
                        Integer.parseInt(animalDto.getAge().substring(0,4)),
                        animalDto.getWeight(),
                        animalDto.getSpecialMark(),
                        animalDto.getNeuterYn(),
                        animalDto.getNoticeNo(),
                        noticeSdate,
                        noticeEdate,
                        animalDto.getFilename(),
                        animalDto.getPopfile(),
                        animalDto.getProcessState(),
                        Float.parseFloat(doc.get("y").toString()),
                        Float.parseFloat(doc.get("x").toString())

                );
                result.add(animal);
            }

        }
        return result;
    }
    public void insertDB(List<Animal> animalList){
        animalService.dataUpdate(animalList);
    }

    public long getPageCnt() throws InterruptedException {
        LocalDate now = LocalDate.now();
        // 연도, 월(문자열, 숫자), 일, 일(year 기준), 요일(문자열, 숫자)
        int year = now.getYear();
        int monthValue = now.getMonthValue()-6;
        if(monthValue<=0){
            year--;
            monthValue = (monthValue+12)%13;
        }

        int dayOfMonth = 1;
        String endDate = Integer.toString(year) + (monthValue<10 ? "0" :"")+Integer.toString(monthValue) +  (dayOfMonth<10 ? "0" :"")+Integer.toString(dayOfMonth);
        String startDate = Integer.toString(year) +  (monthValue<10 ? "0" :"")+Integer.toString(monthValue) +  (dayOfMonth<10 ? "0" :"")+Integer.toString(dayOfMonth);


//        System.out.println(SERVICE_KEY);
        String url = API_URL + "?serviceKey=" + SERVICE_KEY + "&_type=json&numOfRows=1000" +"&pageNo=1&bgnde="+startDate;
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
            System.out.println("totalCount : " + cnt);
        }catch (ParseException e){
            e.printStackTrace();
        }
        return cnt;
    }
}
