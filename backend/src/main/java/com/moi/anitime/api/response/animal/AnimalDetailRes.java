package com.moi.anitime.api.response.animal;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AnimalDetailRes {
    private String kind;
    private String birth;
    private String weight;
    private String color;
    private String gender;

    private String noticeNo;
    private String noticeDate;
    private String location;
    private String specialMark;
    private String shelter;
    private String tel;
    private int shelterNo;
}
