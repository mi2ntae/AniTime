package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.donation.Donation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonationRepo extends JpaRepository<Donation, Integer> {
    Optional<Donation> findDonationByDonationNo(@Param("donationno") int donationNo);
    Page<Donation> findDonationsByBoardNo(@Param("boardno") int boardNo, Pageable pageable);
    void deleteDonationByDonationNo(@Param("donationno") int donationNo);
}
