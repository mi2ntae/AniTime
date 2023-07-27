package com.moi.anitime.exception;

import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.ResponseServiceImpl;
import com.moi.anitime.exception.auth.CAuthenticationEntryPointException;
import com.moi.anitime.exception.auth.NonValidJwtTokenException;
import com.moi.anitime.exception.member.ExistEmailException;
import com.moi.anitime.exception.member.NoExistMemberNoException;
import com.moi.anitime.exception.member.NonExistEmailException;
import com.moi.anitime.exception.member.PasswordIncorrectException;
import com.moi.anitime.exception.profile.NoExistProfileNoException;
import com.moi.anitime.exception.profile.UnSupportedFileTypeException;
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

    @ExceptionHandler(NoExistMemberNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse noExistMemberException() {
        log.error("no exist member exception");
        return responseService.getFailResponse(ExceptionList.NO_EXIST_MEMBER_NO.getCode(), ExceptionList.NO_EXIST_MEMBER_NO.getMessage());
    }

    @ExceptionHandler(NoExistProfileNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse noExistProfileException() {
        log.error("no exist profile exception");
        return responseService.getFailResponse(ExceptionList.NO_EXIST_PROFILE_NO.getCode(), ExceptionList.NO_EXIST_PROFILE_NO.getMessage());
    }

    @ExceptionHandler(PasswordIncorrectException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse passwordIncorrectException() {
        log.error("password incorrect exception");
        return responseService.getFailResponse(ExceptionList.PASSWORD_INCORRECT.getCode(), ExceptionList.PASSWORD_INCORRECT.getMessage());
    }

    @ExceptionHandler(CAuthenticationEntryPointException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse authenticationEntryPointException() {
        log.error("authentication exception");
        return responseService.getFailResponse(ExceptionList.AUTHENTICATION_ENTRY_POINT.getCode(), ExceptionList.AUTHENTICATION_ENTRY_POINT.getMessage());
    }

    @ExceptionHandler(NonValidJwtTokenException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse jwtTokenExpiredException() {
        log.error("jwt token expired");
        return responseService.getFailResponse(ExceptionList.NON_VALID_JWT_TOKEN.getCode(), ExceptionList.NON_VALID_JWT_TOKEN.getMessage());
    }

    @ExceptionHandler(NonExistEmailException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistEmailException() {
        log.error("no exist email exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_EMAIL.getCode(), ExceptionList.NON_EXIST_EMAIL.getMessage());
    }

    @ExceptionHandler(UnSupportedFileTypeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unsupportedFileTypeException() {
        log.error("unsupported file type exception");
        return responseService.getFailResponse(ExceptionList.UNSUPPORTED_FILE_TYPE.getCode(), ExceptionList.UNSUPPORTED_FILE_TYPE.getMessage());
    }

    // 제일 아래에 있었으면 합니다 - 민태 -
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unknown(Exception e) {
        log.error("unknown exception", e);
        return responseService.getFailResponse(ExceptionList.UNKNOWN.getCode(), ExceptionList.UNKNOWN.getMessage());
    }


}
