package com.moi.anitime.api.response;

import com.moi.anitime.model.entity.member.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse<T> extends CommonResponse {
    private String token;
    private Member member;
}
