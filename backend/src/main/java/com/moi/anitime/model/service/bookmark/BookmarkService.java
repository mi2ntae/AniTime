package com.moi.anitime.model.service.bookmark;

import com.moi.anitime.api.request.bookmark.BookmarkReq;
import com.moi.anitime.model.entity.bookmark.Bookmark;

import java.util.List;
import java.util.Optional;

public interface BookmarkService {
    public void bookmark(BookmarkReq bookmarkReq);
}
