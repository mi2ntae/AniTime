package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.bookmark.BookmarkReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.service.animal.AnimalService;
import com.moi.anitime.model.service.bookmark.BookmarkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(value = "입양동물 API", tags = {"Animal"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/desertion")
public class AnimalController {
    private final AnimalService animalService;
    private final ResponseService responseService;
    private final BookmarkService bookmarkService;
    @GetMapping("")
    public ListResponse<Animal> getAllAnimal(
            @RequestParam int generalNo,
            @RequestParam int kindType,
            @RequestParam int genderType,
            @RequestParam int sortType,
            @RequestParam int curPageNo){
        return responseService.getListResponse(animalService.getAllAnimal(generalNo,kindType,genderType,sortType,curPageNo));
    }

    @PostMapping("/like")
    @ApiOperation(value = "즐겨찾기 등록 및 삭제")
    @ApiResponse(code = 200, message = "성공")
    public CommonResponse bookmark(@RequestBody @Valid BookmarkReq bookmarkReq) {
        bookmarkService.bookmark(bookmarkReq);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/bookmark/{generalNo}")
    @ApiOperation(value = "즐겨찾기 유기동물 목록 조회")
    @ApiResponse(code = 200, message = "성공")
    public ListResponse<AnimalPreviewRes> getBookmarkedAnimal(@PathVariable int generalNo, @RequestParam int curpageNo) {
        return responseService.getListResponse(animalService.getBookmarkedAnimal(generalNo, curpageNo));
    }
}
