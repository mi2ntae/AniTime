package com.moi.anitime.exception.profile;

public class UnSupportedFileTypeException extends RuntimeException {
    public UnSupportedFileTypeException() { super(); }

    public UnSupportedFileTypeException(String message) { super(message); }

    public UnSupportedFileTypeException(String message, Throwable th){
        super(message, th);
    }
}
