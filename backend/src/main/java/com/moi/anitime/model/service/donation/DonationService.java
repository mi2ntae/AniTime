package com.moi.anitime.model.service.donation;

import com.moi.anitime.api.response.donation.DonationBoardListRes;
import com.moi.anitime.api.response.donation.DonationBoardRes;
import com.moi.anitime.api.response.donation.DonationBoardsListForShelterRes;
import com.moi.anitime.api.response.donation.DonationListRes;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.Donation;
import com.moi.anitime.model.entity.donation.DonationBoard;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 후원 공고 및 내역 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface DonationService {
    // 후원 공고
    void registerDonationBoard(DonationBoard donationBoard, MultipartFile image, MultipartFile poster) throws IOException, NonExistMemberNoException;
    DonationBoardRes findDonationBoardByBoardNo(int boardNo) throws NonExistDonationBoardException;
    Page<DonationBoardsListForShelterRes> findDonationBoardsByShelter_MemberNo(int shelterNo, int curPageNo) throws NonExistMemberNoException;
    Page<DonationBoardListRes> findDonationBoards(String title, String name, int curPageNo);

    // 후원 내역
    void registerDonation(Donation donation) throws NonExistDonationBoardException;
    Donation findDonationByDonationNo(int donationNo) throws NonExistDonationException;
    Page<DonationListRes> findDonationsByBoardNo(int boardNo, int curPageNo) throws NonExistDonationBoardException;
    void deleteDonationByDonationNo(int donationNo) throws NonExistDonationException;

    // 결제
    void testPayment(String orderId, String paymentKey, int amount) throws IOException;
}
