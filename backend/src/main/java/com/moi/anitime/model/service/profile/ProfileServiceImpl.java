package com.moi.anitime.model.service.profile;

import com.moi.anitime.api.request.profile.ProfileModifyReq;
import com.moi.anitime.api.request.profile.ProfileRegistReq;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.model.repo.ProfileRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class ProfileServiceImpl implements ProfileService{
    private final ProfileRepo profileRepo;

    @Transactional
    @Override
    public void registProfile(ProfileRegistReq profileRegistReq) {
        Profile profile = profileRegistReq.toEntity();
        profileRepo.save(profile);
    }

    @Override
    public void deleteProfile(int profileNo) {
        profileRepo.deleteById(profileNo);
    }

    @Override
    public void updateProfile(int profileNo, ProfileModifyReq profileModifyReq) {
        Profile profile = profileRepo.findById(profileNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 프로필이 존재하지 않습니다. id=" + profileNo));

        if (profileModifyReq.getProfileName() != null) {
            profile.setProfileName(profileModifyReq.getProfileName());
        }
        if (profileModifyReq.getProfileKind() != null) {
            profile.setProfileKind(profileModifyReq.getProfileKind());
        }
        if (profileModifyReq.getDetailKind() != null) {
            profile.setDetailKind(profileModifyReq.getDetailKind());
        }
        if (profileModifyReq.getSexCode() != null) {
            profile.setSexCode(profileModifyReq.getSexCode());
        }
        if (profileModifyReq.getProfileAge() != profile.getProfileAge()) { //손좀보기..힝
            profile.setProfileAge(profileModifyReq.getProfileAge());
        }
        if (profileModifyReq.getSpecialMark() != null) {
            profile.setSpecialMark(profileModifyReq.getSpecialMark());
        }
        if (profileModifyReq.getDateAt() != null) {
            profile.setDateAt(profileModifyReq.getDateAt());
        }
        if (profileModifyReq.getProfileLocation() != null) {
            profile.setProfileLocation(profileModifyReq.getProfileLocation());
            profile.setLat(profileModifyReq.getLat());
            profile.setLon(profileModifyReq.getLon());
        }
        if (profileModifyReq.getImage() != null) {
            profile.setImage(profileModifyReq.getImage());
        }
        // 스웨거로 요청 보내면 null이 안들어가서 ㄱ-  싹다 수정되는건 아닌지 나중에 한번 확인해보기...
        profileRepo.save(profile);
    }
}
