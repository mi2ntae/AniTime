package com.moi.anitime.model.service.donation;

import com.moi.anitime.api.request.donation.DonationBoardRegistReq;
import com.moi.anitime.model.entity.donation.DonationBoard;

/**
 * 후원 공고 및 내역 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface DonationService {
    void registDonationBoard(DonationBoardRegistReq donationBoardRegistReq);
    DonationBoard findDonationBoardByBoardNo(int boardNo);
}
