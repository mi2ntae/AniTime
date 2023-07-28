package com.moi.anitime.model.service.bookmark;

import com.moi.anitime.api.request.bookmark.BookmarkReq;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.bookmark.Bookmark;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.repo.AnimalRepo;
import com.moi.anitime.model.repo.BookmarkRepo;
import com.moi.anitime.model.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepo bookmarkRepo;
    private final MemberRepo memberRepo;
    private final AnimalRepo animalRepo;

    @Override
    public void bookmark(BookmarkReq bookmarkReq) {

        if (! memberRepo.existsById(bookmarkReq.getGeneralNo())) throw new NonExistMemberNoException();
        if (! animalRepo.existsById(bookmarkReq.getDesertionNo())) throw new NonExistDesertionNoException();

        Optional<Bookmark> bookmark = bookmarkRepo.findBookmark(bookmarkReq.getDesertionNo(), bookmarkReq.getGeneralNo());
        if (bookmark.isPresent()) {
            bookmarkRepo.deleteById(bookmark.get().getBookmarkNo());
            return;
        }
        bookmarkRepo.save(bookmarkReq.toEntity());
    }
}
