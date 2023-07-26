package com.moi.anitime.api.controller;

import com.moi.anitime.api.request.member.GeneralMemberRegistReq;
import com.moi.anitime.api.request.member.MemberLoginReq;
import com.moi.anitime.api.request.member.ShelterMemberRegistReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.LoginResponse;
import com.moi.anitime.api.ResponseService;
import com.moi.anitime.exception.member.ExistEmailException;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.service.member.MemberService;
import com.moi.anitime.util.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.sql.SQLException;

@Api(value = "계정 API", tags = {"Auth"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final MemberService memberService;
    private final ResponseService responseService;
    private final JwtTokenProvider jwtTokenProvider;
    @PostMapping("/general")
    @ApiOperation(value = "일반 회원 가입", notes = "<strong>이메일, 패스워드, 전화번호, 이름</strong>을 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = -1018, message = "이메일 중복"),
    })
    public CommonResponse registerGeneralMember(@RequestBody GeneralMemberRegistReq registMember) throws ExistEmailException {
        memberService.registGeneralMember(registMember);
        return responseService.getSuccessResponse();
    }

    @PostMapping("/shelter")
    @ApiOperation(value = "보호소 회원 가입", notes = "<strong>이메일, 패스워드, 전화번호, 이름</strong>을 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = -1018, message = "이메일 중복"),
    })
    public CommonResponse registerShelterMember(@RequestPart(value="member") ShelterMemberRegistReq registMember, @RequestPart(value="image") MultipartFile image) throws ExistEmailException, SQLException, IOException {
        memberService.registShelterMember(registMember, image);
        return responseService.getSuccessResponse();
    }

    @PostMapping
    @ApiOperation(value = "로그인", notes = "로그인한 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = -1019, message = "존재하지 않는 이메일"),
            @ApiResponse(code = -1020, message = "패스워드 불일치"),
    })
    public LoginResponse login(@RequestBody @Valid MemberLoginReq memberLoginReq) {
        Member member = memberService.login(memberLoginReq);
        return responseService.getLoginResponse(jwtTokenProvider.createToken(member.getMemberNo(), member.getMemberKind()), member);
    }

    @GetMapping("/build")
    @ApiOperation(value = "빌드 테스트", notes = "빌드!!")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public CommonResponse buildTest() {
        return responseService.getBuildSuccessResponse();
    }
}