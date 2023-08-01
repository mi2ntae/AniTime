package com.moi.anitime.api.request.donation;

import com.moi.anitime.model.entity.donation.Donation;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("donationRegistReq")
public class DonationRegistReq {
    @NotNull
    private int boardNo;
    @NotNull
    private int generalNo;
    @NotNull
    private int donateAmount;

    public Donation toEntity() {
        return Donation.builder()
                .boardNo(this.boardNo)
                .generalNo(this.generalNo)
                .donateAmount(this.donateAmount)
                .donateDate(LocalDateTime.now())
                .build();
    }
}
