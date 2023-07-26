package com.moi.anitime.model.service.animal;

import com.moi.anitime.exception.animal.ListLoadingException;
import com.moi.anitime.model.entity.animal.Animal;

import java.util.List;

public interface AnimalService {
    public List<Animal> getAllAnimal(int generalNo, int kindType, int genderType, int sortType, int curPageNo) throws ListLoadingException;

}
