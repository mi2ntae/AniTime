package com.moi.anitime.api.controller;


import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.model.entity.animal.AnimalCount;
import com.moi.anitime.model.service.animal.AnimalService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "지도 데이터 Load API", tags = {"Map"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/count")
public class CountController {

    private final AnimalService animalService;
    private final ResponseService responseService;

    @GetMapping("")
    public ListResponse<AnimalCount> getAllAnimal(){
        return responseService.getListResponse(animalService.getAnimalCount());
    }
}
