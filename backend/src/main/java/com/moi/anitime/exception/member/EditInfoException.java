package com.moi.anitime.exception.member;

public class EditInfoException extends RuntimeException {
    public EditInfoException(){
        super();
    }

    public EditInfoException(String message){
        super(message);
    }

    public EditInfoException(String message, Throwable th){
        super(message, th);
    }
}
