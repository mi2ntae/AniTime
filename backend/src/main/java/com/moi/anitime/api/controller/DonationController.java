package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.donation.DonationBoardRegistReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.model.service.donation.DonationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "후원 API", tags = {"Donation"})
//@RestController
@RequiredArgsConstructor
@RequestMapping("/api/donation")
public class DonationController {
    private final ResponseService responseService;
    private final DonationService donationService;

    @PostMapping("/shelter/board")
    @ApiOperation(value = "후원 공고 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public CommonResponse registDonationBoard(@Validated DonationBoardRegistReq donationBoardRegistReq) {
        donationService.registDonationBoard(donationBoardRegistReq);
        return responseService.getSuccessResponse();
    }
}
