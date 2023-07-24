package com.moi.anitime.exception.member;

public class PasswordIncorrectException extends RuntimeException{
    public PasswordIncorrectException(){
        super();
    }

    public PasswordIncorrectException(String message){
        super(message);
    }

    public PasswordIncorrectException(String message, Throwable th){
        super(message, th);
    }
}
