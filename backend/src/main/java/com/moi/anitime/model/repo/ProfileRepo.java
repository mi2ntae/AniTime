package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.profile.Profile;
import com.moi.anitime.api.response.profile.ProfileListRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepo extends JpaRepository<Profile, Integer> {
    @Query("SELECT new com.moi.anitime.api.response.profile.ProfileListRes(p.profileNo, p.profileName) FROM Profile p WHERE p.generalMember.memberNo = :generalNo")
    public List<ProfileListRes> findProfileListByMemberNo(@Param("generalNo") int generalNo);

}
