package com.moi.anitime.model.repo;

import com.moi.anitime.exception.member.EditInfoException;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.ShelterMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface MemberRepo extends JpaRepository<Member, Integer> {
    public Optional<Member> findByEmail (@Param("email") String email);
    public Optional<GeneralMember> findGeneralMemberByMemberNo(@Param("memberno") int memberNo);
    public Optional<ShelterMember> findShelterMemberByMemberNo(@Param("memberno") int memberNo);
    @Modifying
    @Query("UPDATE Member m SET m.password = :password,m.name = :name WHERE m.memberNo=:memberNo")
    public void updateMemberByMemberNo(@Param("memberNo") int memberNo,@Param("password") String password,@Param("name") String name);
}
