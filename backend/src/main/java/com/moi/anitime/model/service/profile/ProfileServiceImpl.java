package com.moi.anitime.model.service.profile;

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
}
