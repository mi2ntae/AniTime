package com.moi.anitime.api.request.profile;

import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.model.entity.profile.ProfileKind;
import com.moi.anitime.model.entity.profile.SexCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * 실종동물 프로필 API 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@Data
@ApiModel("profileRegistReq")
public class ProfileRegistReq {
    @ApiModelProperty(name="이름")
    @NotBlank
    String profileName;

    @NotNull
    int generalNo;

    @ApiModelProperty(name="축종") @NotNull
    ProfileKind profileKind;

    @ApiModelProperty(name="품종") @NotBlank
    String detailKind;

    @ApiModelProperty(name="성별") @NotNull
    SexCode sexCode;

    @ApiModelProperty(name="나이")
    int profileAge;

    @ApiModelProperty(name="특징")
    String specialMark;

    @ApiModelProperty(name="실종일") @NotNull
    LocalDate dateAt;

    @ApiModelProperty(name="실종위치") @NotBlank
    String profileLocation;

    @ApiModelProperty(name="위도") @NotNull
    float lat;

    @ApiModelProperty(name="경도") @NotNull
    float lon;

//    @ApiModelProperty(name = "이미지경로")
//    String image;

    public Profile toEntity() {
        Profile profile = Profile.builder()
                .profileName(this.profileName)
                .generalMember(new GeneralMember(generalNo))
                .profileKind(this.profileKind)
                .detailKind(this.detailKind)
                .sexCode(this.sexCode)
                .profileAge(this.profileAge)
                .specialMark(this.specialMark)
                .dateAt(this.dateAt)
                .profileLocation(this.profileLocation)
                .lat(this.lat)
                .lon(this.lon)
                .build();
        return profile;
    }
}