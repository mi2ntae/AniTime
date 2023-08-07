package com.moi.anitime.exception.notice;

public class CountNoticeException extends RuntimeException{
    public CountNoticeException(){
        super();
    }

    public CountNoticeException(String message){
        super(message);
    }

    public CountNoticeException(String message, Throwable th){
        super(message, th);
    }
}
