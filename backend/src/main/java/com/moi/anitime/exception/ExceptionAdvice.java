package com.moi.anitime.exception;

import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.ResponseServiceImpl;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.exception.auth.CAuthenticationEntryPointException;
import com.moi.anitime.exception.auth.NonValidJwtTokenException;
import com.moi.anitime.exception.chat.UnknownMemberKindException;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.member.ExistEmailException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
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

    @ExceptionHandler(NonExistMemberNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistMemberException() {
        log.error("no exist member exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_MEMBER_NO.getCode(), ExceptionList.NON_EXIST_MEMBER_NO.getMessage());
    }

    @ExceptionHandler(NonExistDesertionNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistDesertionNoException() {
        log.error("no exist desertion no exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_DESERTION_NO.getCode(), ExceptionList.NON_EXIST_DESERTION_NO.getMessage());
    }

    @ExceptionHandler(UnknownMemberKindException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unknownMemberKindException() {
        log.error("unknown member kind");
        return responseService.getFailResponse(ExceptionList.UNKNOWN_MEMBER_KIND.getCode(), ExceptionList.UNKNOWN_MEMBER_KIND.getMessage());
    }

    @ExceptionHandler(NoExistProfileNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse noExistProfileException() {
        log.error("no exist profile exception");
        return responseService.getFailResponse(ExceptionList.UNSUPPORTED_FILE_TYPE.getCode(), ExceptionList.UNSUPPORTED_FILE_TYPE.getMessage());
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

    @ExceptionHandler(NonExistDonationBoardException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistDonationBoardException() {
        log.error("non exist donation board exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_DONATION_BOARD.getCode(), ExceptionList.NON_EXIST_DONATION_BOARD.getMessage());
    }

    @ExceptionHandler(NonExistDonationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistDonationException() {
        log.error("non exist donation exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_DONATION.getCode(), ExceptionList.NON_EXIST_DONATION.getMessage());
    }

    // 제일 아래에 있었으면 합니다 - 민태 -
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unknown(Exception e) {
        log.error("unknown exception {}", e.getMessage());
        return responseService.getFailResponse(ExceptionList.UNKNOWN.getCode(), ExceptionList.UNKNOWN.getMessage());
    }


}
