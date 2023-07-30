package com.moi.anitime.exception.donation;

public class NonExistDonationBoardException extends RuntimeException {
    public NonExistDonationBoardException(){
        super();
    }

    public NonExistDonationBoardException(String message){
        super(message);
    }

    public NonExistDonationBoardException(String message, Throwable th){
        super(message, th);
    }
}
