package com.moi.anitime.api.response.profile;

import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.profile.ProfileKind;
import com.moi.anitime.model.entity.profile.SexCode;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ProfileDetailRes {
    private int profileNo;
    private GeneralMember generalMember;
    private String profileName;
    private ProfileKind profileKind;
    private String detailKind;
    private SexCode sexCode;
    private int profileAge;
    private String specialMark;
    private LocalDate dateAt;
    private String profileLocation;
    private float lat;
    private float lon;
    private String image;
}
