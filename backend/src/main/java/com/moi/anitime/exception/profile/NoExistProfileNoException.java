package com.moi.anitime.exception.profile;

public class NoExistProfileNoException extends RuntimeException {
    public NoExistProfileNoException() { super(); }

    public NoExistProfileNoException(String message) { super(message); }

    public NoExistProfileNoException(String message, Throwable th){
        super(message, th);
    }
}
