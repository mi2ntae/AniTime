package com.moi.anitime.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "미팅 API", tags = {"Meeting"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meet")
public class MeetingController {
//    @PostMapping("reservation")

}
