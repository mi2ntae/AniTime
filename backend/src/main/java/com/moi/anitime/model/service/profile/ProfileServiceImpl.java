package com.moi.anitime.model.service.profile;

import com.moi.anitime.api.request.profile.ProfileModifyReq;
import com.moi.anitime.api.response.profile.ProfileDetailRes;
import com.moi.anitime.api.response.profile.ProfileRes;
import com.moi.anitime.exception.profile.NoExistProfileNoException;
import com.moi.anitime.exception.profile.UnSupportedFileTypeException;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.api.response.profile.ProfileListRes;
import com.moi.anitime.model.entity.profile.SexCode;
import com.moi.anitime.model.repo.ProfileRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
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
        if (image != null) {
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
    public void updateProfile(int profileNo, ProfileModifyReq profileModifyReq, MultipartFile image) throws IOException {
        Profile profile = profileRepo.findById(profileNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 프로필이 존재하지 않습니다. id=" + profileNo));
        String temp = profile.getImage();
        BeanUtils.copyProperties(profileModifyReq, profile);
        if (image != null) {
            if (profile.getImage() != null)s3Uploader.deleteFileFromS3Bucket(profile.getImage());
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
    public List<ProfileListRes> findNamesById(int generalNo) {
        return profileRepo.findProfileListByMemberNo(generalNo);
    }

    @Override
    public ProfileDetailRes findProfileById(int profileNo) throws NoExistProfileNoException {
        Optional<Profile> profile = profileRepo.findById(profileNo);
        if (!profile.isPresent()) throw new NoExistProfileNoException();
        Profile res = profile.get();
        ProfileDetailRes profileDetailRes = ProfileDetailRes.builder()
                .name(res.getProfileName())
                .kind(res.getProfileKind() + " / " + res.getDetailKind())
                .age(res.getProfileAge() + "세")
                .weight(res.getWeight() + "kg")
                .specialMark(res.getSpecialMark())
                .date(res.getDateAt().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")))
                .location(res.getProfileLocation())
                .lat(res.getLat())
                .lon(res.getLon())
                .image(res.getImage())
                .build();
        if (res.getSexCode() == SexCode.F) profileDetailRes.setGender("암컷");
        else if (res.getSexCode() == SexCode.M) profileDetailRes.setGender("수컷");
        return profileDetailRes;
    }

    @Override
    public ProfileRes findProfileByIdSystem(int profileNo) throws NoExistProfileNoException {
        Optional<Profile> profile = profileRepo.findById(profileNo);
        if (!profile.isPresent()) throw new NoExistProfileNoException();
        Profile res = profile.get();
        ProfileRes profileRes = ProfileRes.builder()
                .name(res.getProfileName())
                .profileKind(String.valueOf(res.getProfileKind()))
                .detailKind(res.getDetailKind())
                .age(res.getProfileAge() + "세")
                .weight(res.getWeight() + "kg")
                .specialMark(res.getSpecialMark())
                .date(res.getDateAt().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")))
                .location(res.getProfileLocation())
                .lat(res.getLat())
                .lon(res.getLon())
                .image(res.getImage())
                .gender(String.valueOf(res.getSexCode()))
                .build();
        return profileRes;
    }
}
