package com.moi.anitime.exception.animal;

public class CountAnimalsException extends RuntimeException{
    public CountAnimalsException(){
        super();
    }

    public CountAnimalsException(String message){
        super(message);
    }

    public CountAnimalsException(String message, Throwable th){
        super(message, th);
    }
}
