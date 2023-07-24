package com.moi.anitime.exception.auth;

public class JwtTokenExpiredException extends RuntimeException{
    public JwtTokenExpiredException(){
        super();
    }

    public JwtTokenExpiredException(String message){
        super(message);
    }

    public JwtTokenExpiredException(String message, Throwable th){
        super(message, th);
    }
}
