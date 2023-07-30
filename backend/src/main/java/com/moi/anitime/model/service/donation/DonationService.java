package com.moi.anitime.model.service.donation;

import com.moi.anitime.api.request.donation.DonationBoardRegistReq;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.DonationBoard;
import org.springframework.data.domain.Page;

/**
 * 후원 공고 및 내역 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface DonationService {
    void registerDonationBoard(DonationBoardRegistReq donationBoardRegistReq) throws NonExistMemberNoException;
    DonationBoard findDonationBoardByBoardNo(int boardNo) throws NonExistDonationBoardException;
    Page<DonationBoard> findDonationBoardsByShelter_MemberNo(int shelterNo, int curPageNo) throws NonExistMemberNoException;
    Page<DonationBoard> findDonationBoards(String title, String name, int curPageNo);
}
