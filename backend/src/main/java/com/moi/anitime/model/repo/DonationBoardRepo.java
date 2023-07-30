package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.donation.DonationBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonationBoardRepo extends JpaRepository<DonationBoard, Integer>, JpaSpecificationExecutor<DonationBoard> {
    Optional<DonationBoard> findDonationBoardByBoardNo(@Param("boardno") int boardNo);
    Page<DonationBoard> findDonationBoardsByShelter_MemberNo(@Param("shelterno") int shelterNo, Pageable page);
    @Query(value = "SELECT d FROM donationboard d JOIN sheltermember m ON d.shelterNo = m.memberNo WHERE d.title LIKE :title AND m.name LIKE :name")
    Page<DonationBoard> findDonationBoards(@Param("title") String title, @Param("name") String name, Pageable page);

    /**
     * attainAmount(모인 후원금)을 갱신하기위한 메소드
     * boardNo(후원 공고 번호)를 통해 Donation(후원 내역)테이블에서
     * 해당 공고의 후원 내역에서 후원금을 합산하여 갱신
     * @param boardNo 갱신할 공고 번호
     */
    @Modifying
    @Query(name = "updateAttainAmountByBoardNo", nativeQuery = true)
    void updateDonationBoardByBoardNo(@Param("boardno") int boardNo);
}
