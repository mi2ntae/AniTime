package com.moi.anitime.api.controller;


import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.api.response.profile.ProfileRes;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.service.animal.AnimalService;
import com.moi.anitime.model.service.profile.ProfileService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "실종동물 API", tags = {"Recommand"})
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/recommand")
public class RecommandController {

    private final ProfileService profileService;
    private final AnimalService animalService;
    private final ResponseService responseService;
    @GetMapping("/{profileNo}")
    public ListResponse<AnimalPreviewRes> recommandAnimal(@PathVariable String profileNo, @RequestParam int curPageNo) throws NonExistMemberNoException {
        //여기서 먼저
        log.debug("여기서 뭐가 있을까");
        
        ProfileRes profileInfo = profileService.findProfileByIdSystem(Integer.parseInt(profileNo));
        //필요한 정보를 profileService에 전달해준다.
//        log.debug(profileInfo.toString());
        return responseService.getListResponse(animalService.getAnimalRecommand(profileInfo, curPageNo));
    }

}
