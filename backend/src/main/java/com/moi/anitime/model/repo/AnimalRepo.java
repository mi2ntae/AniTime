package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.animal.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepo extends JpaRepository<Animal, Long> {

    @Query(value = "SELECT A.*,IF(B.bookmarkNo IS NOT NULL,'Y','N') AS isBookMarked FROM Animal AS A " +
            "LEFT JOIN Bookmark AS B ON A.desertionNo=B.desertionNo AND B.generalNo=:generalNo"+
            "WHERE kind LIKE :kind AND sexcd LIKE :sexcd ORDER BY :sortQuery", nativeQuery = true)
    public List<Animal> getAnimal(int generalNo,String kind, char sexcd, String sortQuery, Pageable curPageNo);

    //    @Query("SELECT a.desertionNo, a.kind, a.sexcd, a.image1 FROM Animal a JOIN Bookmark b WHERE b.generalMember.memberNo = :generalNo ORDER BY b.bookmarkNo DESC")
    @Query(value = "SELECT a FROM Animal a JOIN Bookmark b ON a.desertionNo = b.animal.desertionNo WHERE b.generalMember.memberNo = :generalNo ORDER BY b.bookmarkNo DESC")
    public List<Animal> getBookmarkList(@Param("generalNo") int generalNo, Pageable curPageNo);

    public Optional<Animal> findAnimalByDesertionNo(@Param("desertioNo") long no);
}