package com.moi.anitime.exception.member;

public class NonExistEmailException extends RuntimeException{
    public NonExistEmailException(){
        super();
    }

    public NonExistEmailException(String message){
        super(message);
    }

    public NonExistEmailException(String message, Throwable th){
        super(message, th);
    }
}
