package com.moi.anitime.exception.animal;

public class ListLoadingException extends RuntimeException{
    public ListLoadingException(){
        super();
    }

    public ListLoadingException(String message){
        super(message);
    }

    public ListLoadingException(String message, Throwable th){
        super(message, th);
    }
}
