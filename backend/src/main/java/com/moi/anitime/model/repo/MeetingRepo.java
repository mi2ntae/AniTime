package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.meeting.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface MeetingRepo extends JpaRepository<Meeting, Integer> {
    public Page<Meeting> findMeetingsByMember_MemberNoOrderByReservedDateDesc(@Param("generalno") int generalno, Pageable page);
    public Page<Meeting> findMeetingsByAnimal_ShelterNoOrderByReservedDateDesc(@Param("shelterno") int shelterno, Pageable page);
    public int countMeetingByReservedDateBetween(LocalDateTime start, LocalDateTime end);
}