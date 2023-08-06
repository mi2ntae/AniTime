package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.notice.NoticeReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.model.entity.notice.Notice;
import com.moi.anitime.model.service.notice.NoticeService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(value = "알림 API", tags = {"Notice"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    private final NoticeService noticeService;
    private final ResponseService responseService;
    @PostMapping("")
    CommonResponse test(NoticeReq noticeReq){
        noticeService.generateNotice(noticeReq);
        return responseService.getSuccessResponse();
    }

    @GetMapping("")
    ListResponse<Notice> getNoticeList(@RequestParam(value="memberNo",required = true)int memberNo){
        return responseService.getListResponse(noticeService.getNoticeList(memberNo));
    }

    @PutMapping("{noticeNo}")
    CommonResponse readNotice(@PathVariable int noticeNo){
        noticeService.readNotice(noticeNo);
        return responseService.getSuccessResponse();
    }

    @GetMapping("count/{memberNo}")
    SingleResponse<Integer> countUnreadedNotice(@PathVariable int memberNo){
        return responseService.getSingleResponse(noticeService.countUnreadedNotice(memberNo));
    }

    @DeleteMapping("{memberNo}")
    CommonResponse deleteAllNotice(@PathVariable int memberNo){
        noticeService.deleteAllNotice(memberNo);
        return responseService.getSuccessResponse();
    }
}
