package com.moi.anitime.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionList {
    UNKNOWN(-9999, "알 수 없는 오류가 발생하였습니다."),
    EXIST_EMAIL(-1018, "이미 존재하는 이메일입니다."),
    NON_EXIST_EMAIL(-1019, "존재하지 않는 이메일입니다."),
    PASSWORD_INCORRECT(-1020, "비밀번호가 일치하지 않습니다."),
    DUPLICATE_BOOKMARK(-1021, "이미 찜이 되어있는 유기 동물입니다."),
    OPEN_BANK_TRANSFER_ERROR(-1022, "결제에 실패하였습니다."),
    AUTHENTICATION_ENTRY_POINT(-1023, "권한을 확인할 수 없습니다. 다시 로그인하세요"),
    NON_VALID_JWT_TOKEN(-1024, "올바르지 않은 토큰입니다. 다시 로그인하세요"),
    NO_EXIST_MEMBER_NO(-1025, "존재하지 않는 회원입니다."),
    NO_EXIST_PROFILE_NO(-1026, "존재하지 않는 실종동물입니다."),
    UNSUPPORTED_FILE_TYPE(-1028, "파일 형식이 잘못되었습니다.");

    private final int code;
    private final String message;
}