package com.moi.anitime.exception.donation;

public class NonExistDonationException extends RuntimeException {
    public NonExistDonationException(){
        super();
    }

    public NonExistDonationException(String message){
        super(message);
    }

    public NonExistDonationException(String message, Throwable th){
        super(message, th);
    }
}
