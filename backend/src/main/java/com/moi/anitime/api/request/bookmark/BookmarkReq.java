package com.moi.anitime.api.request.bookmark;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.bookmark.Bookmark;
import com.moi.anitime.model.entity.member.GeneralMember;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class BookmarkReq {
    @NotEmpty
    private int generalNo;

    @NotEmpty
    private long desertionNo;

    public Bookmark toEntity() {
        Bookmark bookmark = Bookmark.builder()
                .animal(Animal.builder().desertionNo(this.desertionNo).build())
                .generalMember(GeneralMember.builder().memberNo(this.generalNo).build())
                .build();
        return bookmark;
    }
}
