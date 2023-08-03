package com.moi.anitime.exception.meeting;

public class NonExistMeetNoException extends RuntimeException {
    public NonExistMeetNoException() { super(); }

    public NonExistMeetNoException(String message) { super(message); }

    public NonExistMeetNoException(String message, Throwable th){
        super(message, th);
    }
}
