package com.moi.anitime.api.response.donation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DonationBoardsListForShelterRes {

    private int status;
    private String title;
    private String date;
    private String attained;
    private String goal;
    private int boardNo;
}
