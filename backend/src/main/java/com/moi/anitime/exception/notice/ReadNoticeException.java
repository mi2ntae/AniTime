package com.moi.anitime.exception.notice;

public class ReadNoticeException extends RuntimeException{
    public ReadNoticeException(){
        super();
    }

    public ReadNoticeException(String message){
        super(message);
    }

    public ReadNoticeException(String message, Throwable th){
        super(message, th);
    }
}
