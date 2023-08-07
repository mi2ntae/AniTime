package com.moi.anitime.api.response.animal;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AnimalPreviewRes {
    private long desertionNo;

    private String category; // 축종 개고양
    private String detailKind;// 골든 리튼리버

    private char sexcd;
    private String processState;
    private String thumbnail;
    private boolean isBookmarked;


}
