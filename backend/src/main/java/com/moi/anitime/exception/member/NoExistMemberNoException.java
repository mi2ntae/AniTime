package com.moi.anitime.exception.member;
public class NoExistMemberNoException extends RuntimeException{
    public NoExistMemberNoException(){
        super();
    }

    public NoExistMemberNoException(String message){
        super(message);
    }

    public NoExistMemberNoException(String message, Throwable th){
        super(message, th);
    }
}
