package com.moi.anitime.api.controller;

import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.api.ResponseService;
import com.moi.anitime.exception.member.NoExistMemberNoException;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "멤버 API", tags = {"Shelter"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shelter")
public class ShelterController {
    private final MemberService memberService;
    private final ResponseService responseService;

    @GetMapping("/{memberNo}")
    @ApiOperation(value = "보호소 회원 찾기", notes = "연습용.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = -1025, message = "없는 회원"),
    })
    public SingleResponse findById(@PathVariable("memberNo") int memberNo) throws NoExistMemberNoException {
        Member member = memberService.findShelterMemberById(memberNo);
        return responseService.getSingleResponse(member);
    }
}
