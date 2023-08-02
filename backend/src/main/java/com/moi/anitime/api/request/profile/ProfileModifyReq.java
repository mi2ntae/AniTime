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

import java.time.LocalDate;

/**
 * 실종동물 프로필 API 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@Data
@ApiModel("profileModifyReq")
public class ProfileModifyReq {
    @ApiModelProperty(name="이름")
    String profileName;

    @ApiModelProperty(name="축종")
    ProfileKind profileKind;

    @ApiModelProperty(name="품종")
    String detailKind;

    @ApiModelProperty(name="성별")
    SexCode sexCode;

    @ApiModelProperty(name="나이")
    int profileAge;

    @ApiModelProperty(name="특징")
    String specialMark;

    @ApiModelProperty(name="실종일")
    LocalDate dateAt;

    @ApiModelProperty(name="실종위치")
    String profileLocation;

    @ApiModelProperty(name="위도")
    float lat;

    @ApiModelProperty(name="경도")
    float lon;

    @ApiModelProperty(name = "이미지경로")
    String image;

    @ApiModelProperty(name = "몸무게")
    float weight;

    public Profile toEntity() {
        Profile profile = Profile.builder()
                .profileName(this.profileName)
                .profileKind(this.profileKind)
                .detailKind(this.detailKind)
                .sexCode(this.sexCode)
                .profileAge(this.profileAge)
                .specialMark(this.specialMark)
                .dateAt(this.dateAt)
                .profileLocation(this.profileLocation)
                .lat(this.lat)
                .lon(this.lon)
                .image(this.image)
                .weight(this.weight)
                .build();
        return profile;
    }
}
