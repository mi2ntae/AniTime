package com.moi.anitime.api.response.profile;

import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.profile.ProfileKind;
import com.moi.anitime.model.entity.profile.SexCode;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDetailRes {
    private String name;
    private String kind;
    private String gender;
    private String birth;
    private String weight;
    private String specialMark;
    private String date;
    private String location;
    private float lat;
    private float lon;
    private String image;
}
