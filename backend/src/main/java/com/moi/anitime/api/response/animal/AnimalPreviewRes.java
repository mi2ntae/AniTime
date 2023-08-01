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

    private String category; // 축종
    private String detailKind;

    private char sexCd;
    private String processState;
    private String thumbnail;



}
