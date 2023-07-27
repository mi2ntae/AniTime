package com.moi.anitime.model.entity.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberKind {
    GENERAL(0),
    SHELTER(1);
    private int code;
}
