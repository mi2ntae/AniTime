package com.moi.anitime.exception.auth;

public class CAuthenticationEntryPointException extends RuntimeException{
    public CAuthenticationEntryPointException(){
        super();
    }

    public CAuthenticationEntryPointException(String message){
        super(message);
    }

    public CAuthenticationEntryPointException(String message, Throwable th){
        super(message, th);
    }
}
