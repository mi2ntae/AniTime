package com.moi.anitime.model.repo;

import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.model.entity.animal.Animal;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepo extends JpaRepository<Animal, Long> {

    @Query(name = "getAnimalAsc", nativeQuery = true)
    public List<AnimalPreviewRes> getAnimalAsc(int generalNo, String kind, char sexcd, Pageable curPageNo);

    @Query(name = "getAnimalDesc", nativeQuery = true)
    public List<AnimalPreviewRes> getAnimalDesc(int generalNo, String kind, char sexcd, Pageable curPageNo);

    //    @Query("SELECT a.desertionNo, a.kind, a.sexcd, a.image1 FROM Animal a JOIN Bookmark b WHERE b.generalMember.memberNo = :generalNo ORDER BY b.bookmarkNo DESC")
    @Query(value = "SELECT a FROM Animal a JOIN Bookmark b ON a.desertionNo = b.animal.desertionNo WHERE b.generalMember.memberNo = :generalNo ORDER BY b.bookmarkNo DESC",nativeQuery = true)
    public List<Animal> getBookmarkList(@Param("generalNo") int generalNo, Pageable curPageNo);

    //select * from animal where DATEDIFF(date_format(:a,"%Y-%m-%d"),date_format(animal.finddate,"%Y-%m-%d")) between 0 and 10 and abs(animal.weight-10) <2.5;
    //select * from animal where DATEDIFF(date_format("2023-07-25","%Y-%m-%d"),date_format(animal.finddate,"%Y-%m-%d")) between 0 and 10;

    @Query(value = "select * from animal where DATEDIFF(date_format(findDate,'%Y-%m-%d'),date_format(:prodate,'%Y-%m-%d')) " +
            "between 0 and 30 and abs(:proweight-weight) <2.5 " +
            "and sexcd not like :sexcd and kind like :profileKind and processState not like '종료%' " +
            "and ST_Distance_Sphere(Point(:proLon,:proLat), POINT(lon, lat)) < 8000 " +
            "and kind like :detailKind "+
            "order by DATEDIFF(date_format(:prodate,'%Y-%m-%d'),date_format(findDate,'%Y-%m-%d')) asc",nativeQuery = true)
    public List<Animal> findAnimalByRecommand(String prodate,String sexcd,String profileKind,String detailKind, float proweight, float proLon, float proLat);
    public Optional<Animal> findAnimalByDesertionNo(@Param("desertioNo") long no);
}