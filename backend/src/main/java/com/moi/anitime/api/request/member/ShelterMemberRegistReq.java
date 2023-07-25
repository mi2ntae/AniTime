package com.moi.anitime.api.request.member;

import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.sql.Blob;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("shelterMemberRegistReq")
public class ShelterMemberRegistReq {
	@NotBlank
	@ApiModelProperty(name="이메일")
	private String email;
	@NotBlank
	@ApiModelProperty(name="패스워드")
	private String password;
	@NotBlank
	@ApiModelProperty(name="전화번호")
	private String phone;
	@NotBlank
	@ApiModelProperty(name="이름")
	private String name;
	@NotBlank
	@ApiModelProperty(name="주소")
	private String addr;
	public Member toEntity(PasswordEncoder passwordEncoder, byte[] evidence) {
		Member member = ShelterMember.builder()
				.email(this.email)
				.password(passwordEncoder.encode(this.password))
				.memberKind(1)
				.phone(this.phone)
				.name(this.name)
				.addr(this.addr)
				.evidence(evidence)
				.build();
		return member;
	}
}
