package com.moi.anitime.model.service.profile;

import com.moi.anitime.api.request.profile.ProfileModifyReq;
import com.moi.anitime.api.response.profile.ProfileDetailRes;
import com.moi.anitime.exception.profile.NoExistProfileNoException;
import com.moi.anitime.exception.profile.UnSupportedFileTypeException;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.api.response.profile.ProfileListRes;
import com.moi.anitime.model.repo.ProfileRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class ProfileServiceImpl implements ProfileService{
    private final ProfileRepo profileRepo;

    @Autowired
    private S3Uploader s3Uploader;

    @Transactional
    @Override
    public void registProfile(MultipartFile image, Profile profile) throws Exception {
        if (!image.isEmpty()) {
            String contentType = image.getContentType();
            if (contentType == null || !contentType.startsWith("image")) {
                throw new UnSupportedFileTypeException();
            }

            String storedFileName = s3Uploader.upload(image, "profile");
            profile.setImage(storedFileName);
        }

        profileRepo.save(profile);
    }

    @Override
    public void deleteProfile(int profileNo) {
        Optional<Profile> profile = profileRepo.findById(profileNo);
        if (!profile.isPresent()) throw new NoExistProfileNoException();
        Profile temp = profile.get();
        if (!temp.getImage().isBlank()) {
            s3Uploader.deleteFileFromS3Bucket(temp.getImage());
        }
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

    @Override
    public List<ProfileListRes> findNamesById(int generalNo) {
        return profileRepo.findProfileListByMemberNo(generalNo);
    }

    @Override
    public ProfileDetailRes findProfileById(int profileNo) throws NoExistProfileNoException {
        Optional<Profile> profile = profileRepo.findById(profileNo);
        if (!profile.isPresent()) throw new NoExistProfileNoException();
        Profile res = profile.get();
        ProfileDetailRes profileDetailRes = ProfileDetailRes.builder()
                .profileNo(res.getProfileNo())
                .generalMember(res.getGeneralMember())
                .profileName(res.getProfileName())
                .profileKind(res.getProfileKind())
                .detailKind(res.getDetailKind())
                .sexCode(res.getSexCode())
                .profileAge(res.getProfileAge())
                .specialMark(res.getSpecialMark())
                .dateAt(res.getDateAt())
                .profileLocation(res.getProfileLocation())
                .lat(res.getLat())
                .lon(res.getLon())
                .image(res.getImage())
                .build();
        return profileDetailRes;
    }
}
