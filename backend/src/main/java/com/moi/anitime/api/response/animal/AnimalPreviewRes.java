package com.moi.anitime.api.response.animal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnimalPreviewRes {
    private long desertionNo;

    private String category; // 축종 개고양
    private String detailKind;// 골든 리튼리버

    private char sexcd;
    private String processState;
    private String thumbnail;
    private boolean isBookmarked;


}
