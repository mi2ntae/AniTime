package com.moi.anitime.model.service.profile;

import com.moi.anitime.api.request.profile.ProfileModifyReq;
import com.moi.anitime.api.response.profile.ProfileDetailRes;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.api.response.profile.ProfileListRes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProfileService {
    void registProfile(MultipartFile image, Profile profile) throws Exception;

    void deleteProfile(int profileNo);

    void updateProfile(int profileNo, ProfileModifyReq profileModifyReq, MultipartFile image) throws IOException;

    List<ProfileListRes> findNamesById(int generalNo);

    ProfileDetailRes findProfileById(int profileNo);

}
