package com.moi.anitime.api;

import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.LoginResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.model.entity.member.Member;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ResponseService {
	public <T> SingleResponse<T> getSingleResponse(T data);
	public <T> ListResponse<T> getListResponse(List<T> list);
	public <T> LoginResponse<T> getLoginResponse(String token, Member member);
	public CommonResponse getSuccessResponse();
	public CommonResponse getBuildSuccessResponse();
	public CommonResponse getFailResponse(int code, String message);
}
