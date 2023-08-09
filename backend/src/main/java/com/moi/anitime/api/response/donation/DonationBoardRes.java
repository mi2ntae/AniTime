package com.moi.anitime.api.response.donation;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DonationBoardRes {
    private String title;
    private int dDay;
    private String thumbnail;
    private int attain;
    private int goal;
    private int achievement;
    private String detail;
    private  String poster;
}
