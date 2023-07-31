package com.moi.anitime.schedule;

import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.service.member.MemberService;
import com.moi.anitime.schedule.dto.AnimalDto;
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

import java.util.List;

@Component
@RequiredArgsConstructor
public class AnimalSchedule {


    private final DataApiAnimal dataApiClient;

    private final MemberService memberServiceImpl;

//    @Scheduled(cron = "59 * * * * *")
    public void inputAnimal() throws InterruptedException {

        List<ShelterMember> shelterMemberList = memberServiceImpl.findAllShelterMember();
        System.out.println("shelter member Count : "+ shelterMemberList.size());
        for(ShelterMember shelterMember : shelterMemberList){
            String name= shelterMember.getName();
    }
        //Get요청을 통한 OPenAPI가져오기, 우리 회원이 관리하는 보호소 데이터만 가져오기
        long pageCnt = dataApiClient.getPageCnt();
        pageCnt = pageCnt/1000 + pageCnt%1000==0? 0 : pageCnt%1000;
        System.out.println(pageCnt);
        for(long i =1; i<=pageCnt;i++){

            //api pageNo:i번째 데이터 1000개를 로드해온다.
            List<AnimalDto> animalDtoList = dataApiClient.getData(i);
            //1000개씩 나눠서 동작을 진행해줘야한다.
            //1000개에서 보호소에 있는 개체만을 찾아준다.
            List<AnimalDto> animalcheckList = dataApiClient.checkShelter(animalDtoList,shelterMemberList);
            //todo : kakao api로 lonlat구해오기
           dataApiClient.insertDB(animalDtoList);
            System.out.println(i + "page data input succed");
        }

    }
}
