package com.moi.anitime.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionList {
    UNKNOWN(-9999, "알 수 없는 오류가 발생하였습니다."),
    EXIST_EMAIL(-1005, "이미 존재하는 이메일입니다."),
    NON_EXIST_EMAIL(-1005, "존재하지 않는 이메일입니다."),
    PASSWORD_INCORRECT(-1001, "비밀번호가 일치하지 않습니다."),
    AUTHENTICATION_ENTRYPOINT(-1002, "해당 기능을 이용하기 위한 권한이 없습니다."),
    DUPLICATE_BOOKMARK(-1009, "이미 찜이 되어있는 유기 동물입니다."),
    OPEN_BANK_TRANSFER_ERROR(-1022, "결제에 실패하였습니다."),
    AUTHENTICATION_ENTRY_POINT(-1023, "토큰을 확인할 수 없습니다. 다시 로그인하세요"),
    NON_VALID_JWT_TOKEN(-1024, "올바르지 않은 토큰입니다. 다시 로그인하세요");

    private final int code;
    private final String message;
}