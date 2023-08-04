package com.moi.anitime.exception.notice;

public class NoticeGenerationException extends RuntimeException{
    public NoticeGenerationException(){
        super();
    }

    public NoticeGenerationException(String message){
        super(message);
    }

    public NoticeGenerationException(String message, Throwable th){
        super(message, th);
    }
}
