package com.moi.anitime.exception.member;
public class NonExistMemberNoException extends RuntimeException{
    public NonExistMemberNoException(){
        super();
    }

    public NonExistMemberNoException(String message){
        super(message);
    }

    public NonExistMemberNoException(String message, Throwable th){
        super(message, th);
    }
}
