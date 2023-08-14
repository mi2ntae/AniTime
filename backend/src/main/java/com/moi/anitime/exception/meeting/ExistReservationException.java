package com.moi.anitime.exception.meeting;

public class ExistReservationException extends RuntimeException {
    public ExistReservationException() { super(); }

    public ExistReservationException(String message) { super(message); }

    public ExistReservationException(String message, Throwable th){
        super(message, th);
    }
}
