package com.moi.anitime.exception;

import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.service.ResponseServiceImpl;
import com.moi.anitime.exception.auth.JwtTokenExpiredException;
import com.moi.anitime.exception.member.ExistEmailException;
import com.moi.anitime.exception.member.NonExistEmailException;
import com.moi.anitime.exception.member.PasswordIncorrectException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {
    private final ResponseServiceImpl responseService;

    @ExceptionHandler(ExistEmailException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse existEmailException() {
        log.error("exist email exception");
        return responseService.getFailResponse(ExceptionList.EXIST_EMAIL.getCode(), ExceptionList.EXIST_EMAIL.getMessage());
    }

    @ExceptionHandler(PasswordIncorrectException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse passwordIncorrectException() {
        log.error("password incorrect exception");
        return responseService.getFailResponse(ExceptionList.PASSWORD_INCORRECT.getCode(), ExceptionList.PASSWORD_INCORRECT.getMessage());
    }

    @ExceptionHandler(JwtTokenExpiredException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse jwtTokenExpiredException() {
        log.error("jwt token expired");
        return responseService.getFailResponse(ExceptionList.JWT_TOKEN_EXPIRED.getCode(), ExceptionList.JWT_TOKEN_EXPIRED.getMessage());
    }

    @ExceptionHandler(NonExistEmailException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistEmailException() {
        log.error("no exist email exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_EMAIL.getCode(), ExceptionList.NON_EXIST_EMAIL.getMessage());
    }

    // 제일 아래에 있었으면 합니다 - 민태 -
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unknown(Exception e) {
        log.error("unknown exception", e);
        return responseService.getFailResponse(ExceptionList.UNKNOWN.getCode(), ExceptionList.UNKNOWN.getMessage());
    }


}
