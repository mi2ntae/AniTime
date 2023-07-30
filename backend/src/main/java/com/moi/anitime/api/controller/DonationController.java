package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.donation.DonationBoardRegistReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.PageResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.service.donation.DonationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(value = "후원 API", tags = {"Donation"})
@RestController
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
    public CommonResponse registerDonationBoard(@RequestBody @Valid DonationBoardRegistReq donationBoardRegistReq)
            throws NonExistMemberNoException {
        donationService.registerDonationBoard(donationBoardRegistReq);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/shelter/{shelterNo}")
    @ApiOperation(value = "보호소 회원이 작성한 후원 공고 목록 조회")
    public PageResponse<DonationBoard> getDonationBoardsByShelter_MemberNo(
            @PathVariable int shelterNo,
            @RequestParam int curPageNo)
            throws NonExistMemberNoException {
        return responseService.getPageResponse(donationService.findDonationBoardsByShelter_MemberNo(shelterNo, curPageNo));
    }

    @GetMapping("/{boardNo}")
    @ApiOperation(value = "후원 공고 상세 조회")
    public SingleResponse<DonationBoard> getDonationBoardsByBoardNo(@PathVariable int boardNo) throws NonExistDonationBoardException {
        DonationBoard board = donationService.findDonationBoardByBoardNo(boardNo);
        return responseService.getSingleResponse(board);
    }

    @GetMapping
    @ApiOperation(value = "후원 공고 검색")
    public PageResponse<DonationBoard> getDonationBoards(
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0") int pageNo) {
        System.out.println(searchType);
        System.out.println(keyword);
        System.out.println(pageNo);
        String title = "%";
        String name = "%";
        switch (searchType != null ? searchType : "null") {
            case "title":
                title += keyword + "%";
                break;
            case "name":
                name += keyword + "%";
                break;
        }
        return responseService.getPageResponse(donationService.findDonationBoards(title, name, pageNo));
    }
}
