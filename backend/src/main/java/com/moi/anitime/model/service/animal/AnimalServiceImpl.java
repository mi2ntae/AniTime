package com.moi.anitime.model.service.animal;

import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.exception.animal.ListLoadingException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.repo.AnimalRepo;
import com.moi.anitime.model.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class AnimalServiceImpl implements AnimalService{
    private final AnimalRepo animalRepo;
    private final MemberRepo memberRepo;
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
        }
        return animalRepo.getAnimal(generalNo,kind,sexcd,sortQuery,PageRequest.of(curPageNo, 9));
    }

    @Override
    public List<AnimalPreviewRes> getBookmarkedAnimal(int generalNo, int curPageNo) throws ListLoadingException {
        if (!memberRepo.existsById(generalNo)) throw new NonExistMemberNoException();
        List<Animal> bookmarkedList = animalRepo.getBookmarkList(generalNo, PageRequest.of(curPageNo, 10));

        List<AnimalPreviewRes> bookmarkedListres = bookmarkedList.stream()
                .map(animal -> {
                    StringTokenizer token = new StringTokenizer(animal.getKind());
                    String temp = token.nextToken();
                    AnimalPreviewRes animalPreviewRes = AnimalPreviewRes.builder()
                            .desertionNo(animal.getDesertionNo())
                            .sexCd(animal.getSexcd())
                            .thumbnail(animal.getImage1())
                            .category(temp.substring(1, temp.length()-1))
                            .detailKind(token.nextToken())
                            .build();
                    return animalPreviewRes;
                })
                .collect(Collectors.toList());
        return bookmarkedListres;
    }

    @Override
    public Optional<Animal> getAnimal(long generalNo) throws ListLoadingException {
        return animalRepo.findAnimalByDesertionNo(generalNo);
    }

    @Override
    public void dataUpdate(List<Animal> animalList) {
        System.out.println(animalList.size());
        animalRepo.saveAll(animalList);

    }


}
