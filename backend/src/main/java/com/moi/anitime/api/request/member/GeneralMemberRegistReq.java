package com.moi.anitime.api.request.member;

import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("generalMemberRegistReq")
public class GeneralMemberRegistReq {
	@ApiModelProperty(name="이메일")
	String email;
	@ApiModelProperty(name="패스워드")
	String password;
	@ApiModelProperty(name="전화번호")
	private String phone;
	@ApiModelProperty(name="이름")
	private String name;

//	public Member toEntity() {
//		Member member = Member.builder()
//				.email(this.email)
//				.password(this.password)
//				.memberKind(0)
//				.phone(this.phone)
//				.name(this.name)
//				.build();
//		return member;
//	}
	public Member toEntity() {
		Member member = GeneralMember.builder()
				.email(this.email)
				.password(this.password)
				.memberKind(0)
				.phone(this.phone)
				.name(this.name)
				.snsCheck(false)
				.snsToken("")
				.build();
		return member;
	}
}
