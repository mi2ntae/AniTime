package com.moi.anitime.api.controller;

import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.api.ResponseService;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.exception.member.EditInfoException;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    private final ResponseService responseService;

    @GetMapping("/{memberNo}")
    @ApiOperation(value = "일반 회원 찾기", notes = "연습용.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = -1025, message = "없는 회원"),
    })
    public SingleResponse findById(@PathVariable("memberNo") int memberNo) throws NonExistMemberNoException {
        Member member = memberService.findGeneralMemberById(memberNo);
        return responseService.getSingleResponse(member);
    }

    @PutMapping("/{memberNo}")
    @ApiOperation(value="회원 정보 수정",notes="연습용")
    public CommonResponse editGeneralMember(@PathVariable("memberNo") int memberNo, @RequestBody GeneralMember requestMember) throws EditInfoException{
        memberService.editGeneralMember(memberNo,requestMember);
        return responseService.getSuccessResponse();
    }
}