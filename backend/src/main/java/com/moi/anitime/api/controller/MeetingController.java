package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.meeting.MeetingReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.PageResponse;
import com.moi.anitime.model.service.meeting.MeetingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Api(value = "미팅 API", tags = {"Meeting"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meet")
public class MeetingController {
    private final ResponseService responseService;
    private final MeetingService meetingService;
    @PostMapping("/reservation")
    @ApiOperation(value = "미팅 예약", notes = "입양, 실종 미팅 예약하기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public CommonResponse reserveMeeting(@RequestPart(value = "meetReservation") MeetingReq meetingReq, @RequestPart(value = "adoptionForm", required = false) MultipartFile img) throws IOException {
        meetingService.reserveMeeting(meetingReq, img);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/{memberNo}")
    @ApiOperation(value = "일반회원 미팅목록 조회", notes = "일반회원 미팅목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public PageResponse findMeetsByGeneralNo(@PathVariable("memberNo") int generalNo, @RequestParam("page") int page) {
        return responseService.getPageResponse(meetingService.findMeetingByGeneralNo(generalNo, page));
    }

}
