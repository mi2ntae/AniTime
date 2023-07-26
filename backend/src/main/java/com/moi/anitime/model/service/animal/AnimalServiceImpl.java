package com.moi.anitime.model.service.animal;

import com.moi.anitime.exception.animal.ListLoadingException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.repo.AnimalRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class AnimalServiceImpl implements AnimalService{
    private final AnimalRepo animalRepo;
    @Override
    public List<Animal> getAllAnimal(int generalNo, int kindType, int genderType, int sortType, int curPageNo) throws ListLoadingException {
        String kind="";
        char sexcd='\0';
        String sortQuery="";
        switch (kindType){
            case 0://전체보기
                kind="%";
                break;
            case 1://개만
                kind="[개]%";
                break;
            case 2://고양이만
                kind="[고양이]%";
        }
        switch (genderType){
            case 0://전체보기(미상 포함)
                sexcd='%';
                break;
            case 1://수컷만
                sexcd='M';
                break;
            case 2://암컷만
                sexcd='F';
        }
        switch(sortType){
            case 0://공고 최신순(default)
                sortQuery="noticeSdate desc";
                break;
            case 1://공고 오래된순
                sortQuery="noticeSdate asc";
                break;
            case 2://(안락사)임박일순
                sortQuery="noticeEdate asc";
        }
        return animalRepo.getAnimal(kind,sexcd,sortQuery,PageRequest.of(curPageNo+1, 10));
    }
}
