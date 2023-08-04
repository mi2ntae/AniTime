package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.donation.DonationBoardRegistReq;
import com.moi.anitime.api.request.donation.DonationRegistReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.PageResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.Donation;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.service.donation.DonationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

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
    public CommonResponse registerDonationBoard(
            @RequestPart(value = "donationBoardRegistReq") @Valid DonationBoardRegistReq donationBoardRegistReq,
            @RequestPart(value = "image") MultipartFile image,
            @RequestPart(required = false, value = "poster") MultipartFile poster)
            throws IOException, NonExistMemberNoException {
        donationService.registerDonationBoard(donationBoardRegistReq.toEntity(), image, poster);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/shelter/{shelterNo}")
    @ApiOperation(value = "보호소 회원이 작성한 후원 공고 목록 조회")
    public PageResponse<DonationBoard> getDonationBoardsByShelter_MemberNo(
            @PathVariable int shelterNo,
            @RequestParam(required = false, defaultValue = "0") int pageNo)
            throws NonExistMemberNoException {
        return responseService.getPageResponse(donationService.findDonationBoardsByShelter_MemberNo(shelterNo, pageNo));
    }

    @GetMapping("/shelter/board/{boardNo}")
    @ApiOperation(value = "후원 공고의 후원 내역 조회")
    public PageResponse<Donation> getDonationsByBoardNo(
            @PathVariable int boardNo,
            @RequestParam(required = false, defaultValue = "0") int pageNo)
            throws NonExistDonationBoardException {
        Page<Donation> donations = donationService.findDonationsByBoardNo(boardNo, pageNo);
        return responseService.getPageResponse(donations);
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

    @PostMapping
    @ApiOperation(value = "후원 하기")
    public CommonResponse registerDonation(@RequestBody DonationRegistReq donationRegistReq)
            throws NonExistDonationBoardException{
        donationService.registerDonation(donationRegistReq.toEntity());
        return responseService.getSuccessResponse();
    }

    @DeleteMapping("/{donationNo}")
    @ApiOperation(value = "후원 취소하기")
    public CommonResponse deleteDonation(@PathVariable int donationNo) throws NonExistDonationException {
        donationService.deleteDonationByDonationNo(donationNo);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/payment")
    @ApiOperation(value = "테스트 결제하기")
    public CommonResponse testPayment(@RequestParam("orderId") String orderId, @RequestParam("paymentKey") String paymentKey, @RequestParam("amount") int amount) throws IOException {
        donationService.testPayment(orderId, paymentKey, amount);
        return responseService.getSuccessResponse();
    }

}
