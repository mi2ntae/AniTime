package com.moi.anitime.model.service.donation;

import com.moi.anitime.api.request.donation.DonationBoardRegistReq;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.repo.DonationBoardRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
//@Service
@Slf4j
public class DonationServiceImpl implements DonationService {
    private final DonationBoardRepo donationBoardRepo;

    @Override
    public void registDonationBoard(DonationBoardRegistReq donationBoardRegistReq) {
//        donationBoardRepo.save(donationBoardRegistReq.toEntity());
    }

    @Override
    public DonationBoard findDonationBoardByBoardNo(int boardNo) {
        Optional<DonationBoard> board = donationBoardRepo.findDonationBoardByBoardNo(boardNo);
        return board.get();
    }
}
