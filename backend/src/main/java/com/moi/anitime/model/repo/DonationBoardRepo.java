package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.donation.DonationBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonationBoardRepo extends JpaRepository<DonationBoard, Integer> {
    Optional<DonationBoard> findDonationBoardByBoardNo(@Param("boardno") int boardNo);
    Page<DonationBoard> findDonationBoardsByShelter_MemberNo(@Param("shelterno") int shelterNo, Pageable page);
    @Query(value = "SELECT d FROM donationboard d JOIN sheltermember m ON d.shelterNo = m.memberNo WHERE d.title LIKE :title AND m.name LIKE :name AND d.endAt > CURDATE() AND d.startAt <= CURDATE()")
    Page<DonationBoard> findDonationBoards(@Param("title") String title, @Param("name") String name, Pageable page);

    @Modifying
    @Query(value = "UPDATE donationboard d SET d.attainAmount = d.attainAmount + :amount WHERE d.boardNo = :boardNo")
    void updateAmount(@Param("boardNo") int boardNo, @Param("amount") int amount);
}
