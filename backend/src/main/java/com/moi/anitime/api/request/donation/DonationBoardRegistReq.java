package com.moi.anitime.api.request.donation;

import com.moi.anitime.model.entity.donation.DonationBoard;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("donationBoardRegistReq")
public class DonationBoardRegistReq {
    @NotNull
    @ApiModelProperty(name = "보호소 회원 번호")
    private int shelterNo;

    @NotBlank
    @ApiModelProperty(name = "공고 제목")
    private String title;

    @NotNull
    @ApiModelProperty(name = "목표 금액")
    private int goalAmount;

    @NotNull
    @ApiModelProperty(name = "시작일")
    private String startAt;

    @NotNull
    @ApiModelProperty(name = "종료일")
    private String endAt;


    public DonationBoard toEntity() {
        return DonationBoard.builder()
                .shelterNo(this.shelterNo)
                .title(this.title)
                .goalAmount(this.goalAmount)
                .attainAmount(0)
                .startAt(LocalDateTime.parse(this.startAt))
                .endAt(LocalDateTime.parse(this.endAt))
                .build();
    }
}
