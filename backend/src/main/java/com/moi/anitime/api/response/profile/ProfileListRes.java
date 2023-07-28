package com.moi.anitime.api.response.profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileListRes {
    private int profileNo;
    private String profileName;
}
