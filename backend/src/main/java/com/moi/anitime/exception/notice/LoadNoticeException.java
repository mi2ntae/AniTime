package com.moi.anitime.exception.notice;

public class LoadNoticeException extends RuntimeException{
    public LoadNoticeException(){
        super();
    }

    public LoadNoticeException(String message){
        super(message);
    }

    public LoadNoticeException(String message, Throwable th){
        super(message, th);
    }
}
