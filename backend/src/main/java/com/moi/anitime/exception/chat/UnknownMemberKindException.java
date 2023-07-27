package com.moi.anitime.exception.chat;
public class UnknownMemberKindException extends RuntimeException{
    public UnknownMemberKindException(){
        super();
    }

    public UnknownMemberKindException(String message){
        super(message);
    }

    public UnknownMemberKindException(String message, Throwable th){
        super(message, th);
    }
}
