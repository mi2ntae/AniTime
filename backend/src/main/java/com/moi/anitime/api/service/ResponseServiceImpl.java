package com.moi.anitime.api.service;

import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.LoginResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.model.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ResponseServiceImpl implements ResponseService{
    @AllArgsConstructor
    @Getter
    public enum CommonResult {
        SUCCESS(HttpStatus.OK.value(), "성공하였습니다.");
        int code;
        String message;
    }

    public <T> SingleResponse<T> getSingleResponse(T data) {
        SingleResponse<T> result = new SingleResponse<T>();
        result.setData(data);
        this.setSuccessResult(result);
        return result;
    }

    public <T> ListResponse<T> getListResponse(List<T> list) {
        ListResponse<T> result = new ListResponse<T>();
        result.setData(list);
        this.setSuccessResult(result);
        return result;
    }

    public <T> LoginResponse<T> getLoginResponse(String token, Member member){
        LoginResponse<T> result = new LoginResponse<>();
        result.setToken(token);
        result.setMember(member);
        this.setSuccessResult(result);
        return result;
    }


    public CommonResponse getSuccessResponse() {
        CommonResponse result = new CommonResponse();
        this.setSuccessResult(result);
        return result;
    }

    public CommonResponse getFailResponse(int code, String message) {
        CommonResponse result = new CommonResponse();
        result.setSuccess(false);
        result.setCode(code);
        result.setMessage(message);
        return result;
    }

    private void setSuccessResult(CommonResponse result) {
        result.setSuccess(true);
        result.setCode(CommonResult.SUCCESS.getCode());
        result.setMessage(CommonResult.SUCCESS.getMessage());
    }
}
