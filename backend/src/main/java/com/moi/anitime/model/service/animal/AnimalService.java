package com.moi.anitime.model.service.animal;

import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.exception.animal.ListLoadingException;
import com.moi.anitime.model.entity.animal.Animal;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AnimalService {
    public List<Animal> getAllAnimal(int generalNo, int kindType, int genderType, int sortType, int curPageNo) throws ListLoadingException;

    public List<AnimalPreviewRes> getBookmarkedAnimal(int generalNo, int curPageNo) throws ListLoadingException;
}
