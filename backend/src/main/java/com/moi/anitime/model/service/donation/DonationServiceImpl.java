package com.moi.anitime.model.service.donation;

import com.moi.anitime.api.request.donation.DonationBoardRegistReq;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.repo.DonationBoardRepo;
import com.moi.anitime.model.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class DonationServiceImpl implements DonationService {
    private final DonationBoardRepo donationBoardRepo;
    private final MemberRepo memberRepo;

    @Override
    public void registerDonationBoard(DonationBoardRegistReq donationBoardRegistReq) {
        if (memberRepo.findShelterMemberByMemberNo(donationBoardRegistReq.getShelterNo()).isEmpty())
            throw new NonExistMemberNoException();
        DonationBoard board = donationBoardRegistReq.toEntity();
        donationBoardRepo.save(board);
    }

    @Override
    public DonationBoard findDonationBoardByBoardNo(int boardNo) {
        Optional<DonationBoard> board = donationBoardRepo.findDonationBoardByBoardNo(boardNo);
        if (board.isEmpty()) throw new NonExistDonationBoardException();
        return board.get();
    }

    @Override
    public Page<DonationBoard> findDonationBoardsByShelter_MemberNo(int shelterNo, int curPageNo) {
        if (memberRepo.findShelterMemberByMemberNo(shelterNo).isEmpty())
            throw new NonExistMemberNoException();
        return donationBoardRepo.findDonationBoardsByShelter_MemberNo(shelterNo, PageRequest.of(curPageNo, 10));
    }

    @Override
    public Page<DonationBoard> findDonationBoards(String title, String name, int curPageNo) {
        return donationBoardRepo.findDonationBoards(title, name, PageRequest.of(curPageNo, 10));
    }
}
