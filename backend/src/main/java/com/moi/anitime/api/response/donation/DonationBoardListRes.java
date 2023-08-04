package com.moi.anitime.api.response.donation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DonationBoardListRes {
    private String thumbnail;
    private String title;
    private String shelter;
    private int dDay;
    private int achievement;
    private String attained;
    private String goal;
}
