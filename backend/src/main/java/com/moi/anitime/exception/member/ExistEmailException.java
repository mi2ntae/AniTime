package com.moi.anitime.exception.member;

public class ExistEmailException extends RuntimeException{
    public ExistEmailException(){
        super();
    }

    public ExistEmailException(String message){
        super(message);
    }

    public ExistEmailException(String message, Throwable th){
        super(message, th);
    }
}
