package com.moi.anitime.api.controller;


import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.api.response.profile.ProfileRes;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.service.profile.ProfileService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "실종동물 API", tags = {"Recommand"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommand")
public class RecommandController {

    private ProfileService profileService;

    @GetMapping("/{profileNo}")
    public List<AnimalPreviewRes> recommandAnimal(@PathVariable("profileNo") int profileNo) throws NonExistMemberNoException {
        //여기서 먼저
        ProfileRes profileInfo = profileService.findProfileByIdSystem(profileNo);
        //필요한 정보를 profileService에 전달해준다.

        return null;
    }
}
