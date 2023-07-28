package com.moi.anitime.api.controller;

import com.moi.anitime.api.request.profile.ProfileModifyReq;
import com.moi.anitime.api.request.profile.ProfileRegistReq;
import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.model.entity.profile.ProfileListDTO;
import com.moi.anitime.model.service.profile.ProfileService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Api(value = "실종동물 프로필 Api", tags = {"Profile"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    private final ResponseService responseService;
    private final ProfileService profileService;

    @PostMapping
    @ApiOperation(value="실종동물 프로필 등록", notes = "<strong>이름, 축종, 품종, 성별, 실종일, 실종위치, 위도, 경도</strong>는 필수 입력 항목")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public CommonResponse registerProfile(@RequestPart("profile") @Validated ProfileRegistReq profileRegistReq, @RequestPart("image") MultipartFile image) throws Exception {

//        Optional<MultipartFile> imageFile = Optional.ofNullable(image); // 이미지가 Null이 들어와도 예외처리 x

//        if (imageFile.isPresent()) {
//            String contentType = image.getContentType();
//            if (contentType == null || !contentType.startsWith("image")) {
//                throw new IllegalArgumentException("이미지 파일을 올려주세요.");
//            }

//            String originalFileName = uploadFile.getOriginalFilename();
//            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일 확장자 추출
//            String newFileName = UUID.randomUUID().toString() + fileExtension; // UUID를 이용해 파일명 중복 방지
//
//            Path uploadsDir = Paths.get("이미지경로");
//            if (!Files.exists(uploadsDir)) { // 폴더 생성
//                Files.createDirectories(uploadsDir);
//            }
//            uploadFile.transferTo(Paths.get(uploadsDir.toString(), newFileName)); // 이미지 저장
//
//            String imagePath = uploadsDir.resolve(newFileName).toAbsolutePath().toString();
//            profileRegistReq.setImage(imagePath);
//        }
        Profile profile = profileRegistReq.toEntity();
        profileService.registProfile(image, profile);
        return responseService.getSuccessResponse();
    }

    @DeleteMapping("/{profileNo}")
    @ApiOperation(value = "실종동물 프로필 삭제")
    @ApiResponse(code = 200, message = "성공")
    public CommonResponse deleteProfile(@PathVariable("profileNo") int profileNo) {
        profileService.deleteProfile(profileNo);
        return responseService.getSuccessResponse();
    }

    @PutMapping("/{profileNo}")
    @ApiOperation(value = "실종동물 프로필 수정")
    @ApiResponse(code = 200, message = "성공")
    public CommonResponse modifyProfile(@PathVariable("profileNo") int profileNo, @RequestBody ProfileModifyReq profileModifyReq) { // 변경되는 프로필 정보만 객체에 담긴다
        profileService.updateProfile(profileNo, profileModifyReq);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/{generalNo}")
    @ApiOperation(value = "실종동물 프로필 목록 조회")
    @ApiResponse(code = 200, message = "성공")
    public ListResponse<ProfileListDTO> getProfileList(@PathVariable("generalNo") int generalNo) {
        return responseService.getListResponse(profileService.findNamesById(generalNo));
    }

    @GetMapping("/detail/{profileNo}")
    @ApiOperation(value="실종동물 상세 조회")
    @ApiResponse(code = 200, message = "성공")
    public SingleResponse getProfileDetail(@PathVariable("profileNo") int profileNo) {
        return responseService.getSingleResponse(profileService.findProfileById(profileNo));
    }
}
