package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.meeting.MeetingReq;
import com.moi.anitime.api.request.meeting.MeetingStatusReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.PageResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.model.service.meet.MeetingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
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
        meetingService.reserveMeet(meetingReq, img);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/{memberNo}")
    @ApiOperation(value = "미팅 목록 조회", notes = "일반, 보호소 회원 미팅목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public PageResponse findMeetsByMemberNo(@PathVariable("memberNo") int memberNo, @RequestParam("page") int page) {
        return responseService.getPageResponse(meetingService.findMeetsByMemberNo(memberNo, page));
    }

    @GetMapping("/shelter/{meetNo}")
    @ApiOperation(value = "미팅 상세 조회", notes = "보호소 회원 미팅 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public SingleResponse findMeetsByGeneralNo(@PathVariable("meetNo") int meetNo) {
        return responseService.getSingleResponse(meetingService.findMeetByMeetNo(meetNo));
    }

    @PutMapping("/{meetNo}")
    @ApiOperation(value = "미팅 상태 변경", notes = "보호소 회원 미팅 승인 및 반려")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public CommonResponse setMeetState(@PathVariable("meetNo") int meetNo, @RequestBody MeetingStatusReq meetingStatusReq) {
        meetingService.setMeetState(meetNo, meetingStatusReq);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/reservation/{shelterNo}")
    @ApiOperation(value = "미팅 가능 시간 조회", notes = "월,일을 받아서 미팅이 가능한 시각 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public SingleResponse findPossibleTime(@PathVariable("shelterNo") int shelterNo, @RequestParam("month") int month, @RequestParam("day") int day) {
        return responseService.getSingleResponse(meetingService.getPossibleTime(shelterNo, month, day));
    }

}
