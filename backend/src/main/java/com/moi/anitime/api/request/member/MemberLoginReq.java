package com.moi.anitime.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("memberLoginReq")
public class MemberLoginReq {
	@NotBlank
	@ApiModelProperty(name="이메일")
	String email;
	@NotBlank
	@ApiModelProperty(name="패스워드")
	String password;
	@NotNull
	@ApiModelProperty(name="회원 종류")
	int memberKind;
}
