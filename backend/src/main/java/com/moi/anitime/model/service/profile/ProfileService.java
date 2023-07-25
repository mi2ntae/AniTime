package com.moi.anitime.model.service.profile;

import com.moi.anitime.api.request.profile.ProfileRegistReq;
import com.moi.anitime.model.entity.profile.Profile;

public interface ProfileService {
    void registProfile(ProfileRegistReq profileRegistReq);

    void deleteProfile(int profileNo);
}
