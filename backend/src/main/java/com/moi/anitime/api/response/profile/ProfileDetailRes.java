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
    private String name;
    private ProfileKind category;
    private String kind;
    private String gender;
    private int age;
    private float weight;
    private String specialMark;
    private String date;
    private String location;
    private float lat;
    private float lon;
    private String image;
}
