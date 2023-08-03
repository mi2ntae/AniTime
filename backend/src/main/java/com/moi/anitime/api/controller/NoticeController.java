package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.notice.NoticeReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.model.service.notice.NoticeService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
