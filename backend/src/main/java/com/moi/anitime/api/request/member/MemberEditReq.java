package com.moi.anitime.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.PutMapping;

import javax.validation.constraints.NotBlank;

/**
 * 회원 정보 수정 API ([PUT] /api/member/{memberNo}) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("memberEditReq")
public class MemberEditReq {
    @NotBlank
    @ApiModelProperty(name="이름")
    String name;
    @NotBlank
    @ApiModelProperty(name="패스워드")
    String password;
}
