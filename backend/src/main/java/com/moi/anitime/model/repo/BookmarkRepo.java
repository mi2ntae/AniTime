package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.bookmark.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepo extends JpaRepository<Bookmark, Integer> {

    @Query(value = "SELECT b from Bookmark b WHERE b.animal.desertionNo = :desertionNo AND b.generalMember.memberNo = :generalNo",nativeQuery = true)
    public Optional<Bookmark> findBookmark(@Param("desertionNo") long desertionNo, @Param("generalNo") int generalNo);


}
