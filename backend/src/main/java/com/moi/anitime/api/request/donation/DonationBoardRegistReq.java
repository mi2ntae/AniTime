package com.moi.anitime.api.request.donation;

import com.moi.anitime.model.entity.donation.DonationBoard;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@Data
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
    @ApiModelProperty(name = "시작연도")
    private int sYear;

    @NotNull
    @ApiModelProperty(name = "시작월")
    private int sMonth;

    @NotNull
    @ApiModelProperty(name = "시작일")
    private int sDay;

    @NotNull
    @ApiModelProperty(name = "종료연도")
    private int eYear;

    @NotNull
    @ApiModelProperty(name = "종료월")
    private int eMonth;

    @NotNull
    @ApiModelProperty(name = "종료일")
    private int eDay;


    public DonationBoard toEntity() {
        System.out.println(this.shelterNo);
        System.out.println(this.title);
        System.out.println(this.goalAmount);
        System.out.println("sYear: " + this.sYear);
        System.out.println("sMonth: " + this.sMonth);
        System.out.println("sDay: " + this.sDay);
        System.out.println("eYear: " + this.eYear);
        System.out.println("eMonth: " + this.eMonth);
        System.out.println("eDay: " + this.eDay);

        return DonationBoard.builder()
                .shelterNo(this.shelterNo)
                .title(this.title)
                .goalAmount(this.goalAmount)
                .attainAmount(0)
                .startAt(LocalDate.of(this.sYear, this.sMonth, this.sDay))
                .endAt(LocalDate.of(this.eYear, this.eMonth, this.eDay))
                .build();
    }
}
