package com.moi.anitime.api.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
public class PageResponse<T> extends CommonResponse {
    private Page<T> data;
}
