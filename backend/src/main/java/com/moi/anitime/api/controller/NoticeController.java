package com.moi.anitime.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "알림 API", tags = {"Notice"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {

}
