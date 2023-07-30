package com.moi.anitime.api;

import com.moi.anitime.api.response.*;
import com.moi.anitime.model.entity.member.Member;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ResponseService {
	public <T> SingleResponse<T> getSingleResponse(T data);
	public <T> ListResponse<T> getListResponse(List<T> list);
	public <T> PageResponse<T> getPageResponse(Page<T> page);
	public <T> LoginResponse<T> getLoginResponse(String token, Member member);
	public CommonResponse getSuccessResponse();
	public CommonResponse getBuildSuccessResponse();
	public CommonResponse getFailResponse(int code, String message);
}
