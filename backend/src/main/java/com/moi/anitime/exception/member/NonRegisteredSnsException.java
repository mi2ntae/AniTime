package com.moi.anitime.exception.member;

public class NonRegisteredSnsException extends RuntimeException{
    public NonRegisteredSnsException(){
        super();
    }

    public NonRegisteredSnsException(String message){
        super(message);
    }

    public NonRegisteredSnsException(String message, Throwable th){
        super(message, th);
    }
}
