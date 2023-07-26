package com.moi.anitime.api.controller;

import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.service.ResponseService;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.service.animal.AnimalService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "입양동물 API", tags = {"Animal"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/desertion")
public class AnimalController {
    private final AnimalService animalService;
    private final ResponseService responseService;
    @GetMapping("")
    public ListResponse<Animal> getAllAnimal(
            @RequestParam int generalNo,
            @RequestParam int kindType,
            @RequestParam int genderType,
            @RequestParam int sortType,
            @RequestParam int curPageNo){
        return responseService.getListResponse(animalService.getAllAnimal(generalNo,kindType,genderType,sortType,curPageNo));
    }
}
