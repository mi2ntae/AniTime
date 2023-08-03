package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.meeting.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MeetingRepo extends JpaRepository<Meeting, Integer> {
    public Page<Meeting> findMeetingsByMember_MemberNoOrderByReservedDateDesc(@Param("generalno") int generalno, Pageable page);
    public Page<Meeting> findMeetingsByAnimal_ShelterNoOrderByReservedDateDesc(@Param("shelterno") int shelterno, Pageable page);
    public int countMeetingByReservedDateBetweenAndMember_MemberNo(LocalDateTime start, LocalDateTime end, @Param("generalno") int generalNo);
    public int countMeetingByReservedDateBetweenAndAnimal_ShelterNo(LocalDateTime start, LocalDateTime end, @Param("shelterno") int shelterNo);
    @Query(value = "SELECT * FROM Meeting JOIN Animal ON Meeting.desertionno = Animal.desertionno WHERE Animal.shelterno = :shelterno and DATE(reservedDate) = :now", nativeQuery = true)
    public List<Meeting> findMeetingsByAnimal_ShelterNoAndMonthAndDay(@Param("shelterno") int shelterNo, LocalDate now);
}