package com.moi.anitime.model.service.animal;

import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.api.response.profile.ProfileRes;
import com.moi.anitime.exception.animal.CountAnimalsException;
import com.moi.anitime.exception.animal.ListLoadingException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.model.repo.AnimalRepo;
import com.moi.anitime.model.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public List<AnimalPreviewRes> getAllAnimal(int generalNo, int kindType, int genderType, int sortType, int curPageNo) throws ListLoadingException {
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
        switch (genderType) {
            case 0://전체보기(미상 포함)
                sexcd = '%';
                break;
            case 1://수컷만
                sexcd = 'M';
                break;
            case 2://암컷만
                sexcd = 'F';
        }
        switch(sortType){
            case 0://공고 최신순(default)
                return animalRepo.getAnimalDesc(generalNo,kind,sexcd,PageRequest.of(curPageNo, 9));
            case 1://공고 오래된순
                return animalRepo.getAnimalAsc(generalNo,kind,sexcd,PageRequest.of(curPageNo, 9));
            default:throw new ListLoadingException();
        }
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
                            .sexcd(animal.getSexcd())
                            .thumbnail(animal.getImage2())
                            .category(temp.substring(1, temp.length()-1))
                            .detailKind(token.nextToken())
                            .build();
                    return animalPreviewRes;
                })
                .collect(Collectors.toList());
        return bookmarkedListres;
    }

    @Override
    public Optional<Animal> getAnimal(long desertionNo) throws ListLoadingException {
        return animalRepo.findAnimalByDesertionNo(desertionNo);
//        return animalRepo.findById(desertionNo);
    }

    @Override
    public void dataUpdate(List<Animal> animalList) {
        System.out.println(animalList.size());
        animalRepo.saveAll(animalList);
    }

    @Override
    public List<AnimalPreviewRes> getAnimalRecommand(ProfileRes profile, int curPageNo) throws ListLoadingException {
        // 프로필에서 가져와야하는 정보는?
        System.out.println(profile);
        String data = profile.getDate(); // lost date
        String gender = profile.getGender().equals("F") ? "M" : "F";
        String profileKind = "[" + profile.getProfileKind() + "]%";
        String detailKind = "%"+profile.getDetailKind()+"%";
        float weight = Float.parseFloat(profile.getWeight().substring(0,profile.getWeight().length()-2));
        float lon = profile.getLon();
        float lat = profile.getLat();
        //List<Animal> findAnimalByRecommand(String ,String ,String profileKind,String detailKind, float proweight, float proLon, float proLat);
        List<Animal> animalList = animalRepo.findAnimalByRecommand(data, gender,profileKind,detailKind,weight,lon,lat, PageRequest.of(curPageNo, 9));

        List<AnimalPreviewRes> animalListres = animalList.stream()
                .map(animal -> {
                    StringTokenizer token = new StringTokenizer(animal.getKind());
                    String temp = token.nextToken();
                    AnimalPreviewRes animalPreviewRes = AnimalPreviewRes.builder()
                            .desertionNo(animal.getDesertionNo())
                             .sexcd(animal.getSexcd())
                            .thumbnail(animal.getImage2())
                            .category(temp.substring(1, temp.length()-1))
                            .detailKind(token.nextToken())
                            .processState(animal.getProcessState())
                            .isBookmarked(false)
                            .build();
                    return animalPreviewRes;
                })
                .collect(Collectors.toList());
        return animalListres;
    }

    @Override
    public int countNewAnimals() throws CountAnimalsException {
        return animalRepo.countNewAnimals();
    }

    @Override
    public int countKeepingAnimals() throws CountAnimalsException{
        return animalRepo.countKeepingAnimals();
    }

    @Override
    public int countPostingAnimals() throws CountAnimalsException {
        return animalRepo.countPostingAnimals();
    }
}
