package com.moi.anitime.exception.member;

public class SnsNotConnectedMemberException extends RuntimeException {
    public SnsNotConnectedMemberException(){
        super();
    }

    public SnsNotConnectedMemberException(String message){
        super(message);
    }

    public SnsNotConnectedMemberException(String message, Throwable th){
        super(message, th);
    }
}
