package com.moi.anitime.schedule;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.animal.AnimalCount;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.service.animal.AnimalService;
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

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class AnimalSchedule {


    private final DataApiAnimal dataApiClient;

    private final MemberService memberServiceImpl;
    private final AnimalService animalServiceImpl;
//    @Transactional
    @Scheduled(cron = "0 35 01 * * *")
    public void inputAnimal() throws InterruptedException {

        List<ShelterMember> shelterMemberList = memberServiceImpl.findAllShelterMember();
        //Get요청을 통한 OPenAPI가져오기, 우리 회원이 관리하는 보호소 데이터만 가져오기
        long pageCnt = dataApiClient.getPageCnt("");
        System.out.println(pageCnt);
        pageCnt = pageCnt/1000 + (pageCnt%1000==0? 0 : 1);
        System.out.println(pageCnt);
        for(long i =1; i<=pageCnt;i++){
            System.out.println("page start");
            //api pageNo:i번째 데이터 1000개를 로드해온다.
            List<AnimalDto> animalDtoList = dataApiClient.getData(i);
            //1000개씩 나눠서 동작을 진행해줘야한다.
            //1000개에서 보호소에 있는 개체만을 찾아준다.
            System.out.println(i+" get data succed");
            List<AnimalDto> animalcheckList = dataApiClient.checkShelter(animalDtoList,shelterMemberList);
            System.out.println("animalcheckList size :" + animalcheckList.size());
            //
            if(animalcheckList.size()==0) {
                System.out.println("checkList size is 0");
                System.out.println(i + " page data input succed");

                continue;}
            System.out.println(i+" shelter fliter succed");
            List<Animal> dataType = dataApiClient.splitData(animalcheckList);

            System.out.println("lonlat entity set up succed");
            dataApiClient.insertDB(dataType);
            System.out.println(i + " page data input succed");
        }

        System.out.println(" Data synchronization Complete");

    }

    @Scheduled(cron = " 05 41 * * * *")
    public void inputCount() throws InterruptedException {
        // 보호소 entity를 가져온다
        List<AnimalCount> animalCountList = animalServiceImpl.getAnimalCount();
        for(int i=0;i<animalCountList.size();i++){
            animalCountList.get(i).setEntryNumber((int)dataApiClient.getPageCnt(Integer.toString(animalCountList.get(i).getMapCd())));
        }
        animalServiceImpl.cntDataUpdate(animalCountList);
    }
}
