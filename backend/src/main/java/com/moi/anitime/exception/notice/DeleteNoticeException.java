package com.moi.anitime.exception.notice;

public class DeleteNoticeException extends RuntimeException{
    public DeleteNoticeException(){
        super();
    }

    public DeleteNoticeException(String message){
        super(message);
    }

    public DeleteNoticeException(String message, Throwable th){
        super(message, th);
    }
}
