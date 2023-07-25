package com.moi.anitime.exception.auth;

public class NonValidJwtTokenException extends RuntimeException{
    public NonValidJwtTokenException(){
        super();
    }

    public NonValidJwtTokenException(String message){
        super(message);
    }

    public NonValidJwtTokenException(String message, Throwable th){
        super(message, th);
    }
}
