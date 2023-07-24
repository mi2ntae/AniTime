package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepo extends JpaRepository<Member, Integer> {
    public Optional<Member> findByEmail (@Param("email") String email);
}
