package com.moi.anitime.exception.animal;

public class NonExistDesertionNoException extends RuntimeException{
    public NonExistDesertionNoException(){
        super();
    }

    public NonExistDesertionNoException(String message){
        super(message);
    }

    public NonExistDesertionNoException(String message, Throwable th){
        super(message, th);
    }
}
