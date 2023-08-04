package com.moi.anitime.api.response.profile;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileRes {
    private String name;
    private String profileKind;
    private String detailKind;
    private String gender;
    private String age;
    private String weight;
    private String specialMark;
    private String date;
    private String location;
    private float lat;
    private float lon;
    private String image;
}
