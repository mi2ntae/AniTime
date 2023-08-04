package com.moi.anitime.api.response.donation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DonationListRes {
    private String donationDate;

    private String memberName;

    private String money;
}
