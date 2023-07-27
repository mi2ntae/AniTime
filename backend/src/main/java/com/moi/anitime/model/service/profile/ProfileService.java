package com.moi.anitime.model.service.profile;

import com.moi.anitime.api.request.profile.ProfileModifyReq;
import com.moi.anitime.api.request.profile.ProfileRegistReq;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.model.entity.profile.ProfileListDTO;

import java.util.List;

public interface ProfileService {
    void registProfile(ProfileRegistReq profileRegistReq);

    void deleteProfile(int profileNo);

    void updateProfile(int profileNo, ProfileModifyReq profileModifyReq);

    List<ProfileListDTO> findNamesById(int generalNo);

}
