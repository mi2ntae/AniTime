package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.request.bookmark.BookmarkReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.api.response.animal.AnimalDetailRes;
import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.service.animal.AnimalService;
import com.moi.anitime.model.service.bookmark.BookmarkService;
import com.moi.anitime.model.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;
import java.util.StringTokenizer;

@Api(value = "입양동물 API", tags = {"Animal"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/desertion")
public class AnimalController {
    private final AnimalService animalService;
    private final ResponseService responseService;
    private final BookmarkService bookmarkService;
    private final MemberService memberService;
    @GetMapping("")
    public ListResponse<AnimalPreviewRes> getAllAnimal(
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

//    @GetMapping("/animal/{generalNo}")
//    @ApiResponse(code= 200, message = "성공")
//    public

    @GetMapping("/{desertionNo}")
    @ApiOperation(value="유기동물 상세정보 조회")
    @ApiResponse(code = 200, message = "성공")
    public SingleResponse getAnimalDetail(@PathVariable("desertionNo") long desertionNo) throws Exception {
        Optional<Animal> res = animalService.getAnimal(desertionNo);
        if (res.isEmpty()) {
            throw new NonExistDesertionNoException();
        }
        Animal animal = res.get();
        StringTokenizer token = new StringTokenizer(animal.getKind(), " ");
        String category = token.nextToken();

        Member shelterMember = memberService.findShelterMemberById(animal.getShelterNo());

        AnimalDetailRes animalDetailRes = AnimalDetailRes.builder()
                .thumbnail(animal.getImage2())
                .kind(category.substring(1, category.length()-1) + " / " + token.nextToken())//
                .birth(animal.getAge() + "년생")
                .weight(animal.getWeight() + "kg")
                .color(animal.getColor())
                .noticeNo(animal.getNoticeNo())
                .noticeDate(animal.getNoticeSdate() + " ~ " + animal.getNoticeEdate())
                .location(animal.getFindPlace())
                .specialMark(animal.getSpecialMark())
                .shelter(shelterMember.getName())
                .tel(shelterMember.getPhone())
                .shelterNo(animal.getShelterNo())
                .build();
        if (animal.getSexcd() == 'F') animalDetailRes.setGender("암컷");
        else if (animal.getSexcd() == 'M') animalDetailRes.setGender("수컷");
        return responseService.getSingleResponse(animalDetailRes);
    }

    @GetMapping("/new")
    SingleResponse<Integer> countNewAnimals(){
        return responseService.getSingleResponse(animalService.countNewAnimals());
    }

    @GetMapping("/count/posting")
    SingleResponse<Integer> countPostingAnimals(){
        return responseService.getSingleResponse(animalService.countPostingAnimals());
    }

    @GetMapping("/count/keeping")
    SingleResponse<Integer> countKeepingAnimals(){
        return responseService.getSingleResponse(animalService.countKeepingAnimals());
    }

}
