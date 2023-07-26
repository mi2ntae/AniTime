package com.moi.anitime.api.controller;

import com.moi.anitime.api.request.profile.ProfileRegistReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.ResponseService;
import com.moi.anitime.model.service.profile.ProfileService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(value = "실종동물 프로필 Api", tags = {"Profile"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    private final ResponseService responseService;
    private final ProfileService profileService;

    @PostMapping
    @ApiOperation(value="실종동물 프로필 등록", notes = "<strong>이름, 축종, 품종, 성별, 실종일, 실종위치, 위도, 경도</strong>는 필수 입력 항목")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
    })
    public CommonResponse registerProfile(@RequestBody ProfileRegistReq profileRegistReq) {
        profileService.registProfile(profileRegistReq);
        return responseService.getSuccessResponse();
    }

    @DeleteMapping("/{profileNo}")
    @ApiOperation(value = "실종동물 삭제")
    @ApiResponse(code = 200, message = "성공")
    public CommonResponse deleteProfile(@PathVariable("profileNo") int profileNo) {
        profileService.deleteProfile(profileNo);
        return responseService.getSuccessResponse();
    }
}
