package com.moi.anitime.model.service.donation;

import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.Donation;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.repo.DonationBoardRepo;
import com.moi.anitime.model.repo.DonationRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class DonationServiceImpl implements DonationService {
    private final DonationRepo donationRepo;
    private final DonationBoardRepo donationBoardRepo;
    private final MemberRepo memberRepo;
    private final S3Uploader s3Uploader;

    @Value("${donationBoard.image.path}")
    private String imagePath;
    @Value("${donationBoard.poster.path}")
    private String posterPath;

    @Override
    public void registerDonationBoard(DonationBoard donationBoard, MultipartFile image, MultipartFile poster) throws IOException {
        if (memberRepo.findShelterMemberByMemberNo(donationBoard.getShelterNo()).isEmpty())
            throw new NonExistMemberNoException();
        String storedImageName = s3Uploader.upload(image, imagePath);
        donationBoard.setImage1(storedImageName);
        if (poster != null) {
            String storedPosterName = s3Uploader.upload(poster, posterPath);
            donationBoard.setPoster(storedPosterName);
        }
        donationBoardRepo.save(donationBoard);
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

    @Override
    @Transactional
    public void registerDonation(Donation donation) {
        Optional<DonationBoard> donationBoard = donationBoardRepo.findDonationBoardByBoardNo(donation.getBoardNo());
        if (donationBoard.isEmpty())
            throw new NonExistDonationBoardException();
        donationRepo.save(donation);
        donationBoard.get().setAttainAmount(donationBoard.get().getAttainAmount() + donation.getDonateAmount());
    }

    @Override
    public Donation findDonationByDonationNo(int donationNo) {
        Optional<Donation> donation = donationRepo.findDonationByDonationNo(donationNo);
        if (donation.isEmpty())
            throw new NonExistDonationException();
        return donation.get();
    }

    @Override
    public Page<Donation> findDonationsByBoardNo(int boardNo, int curPageNo) {
        if (donationBoardRepo.findDonationBoardByBoardNo(boardNo).isEmpty())
            throw new NonExistDonationBoardException();
        return donationRepo.findDonationsByBoardNo(boardNo, PageRequest.of(curPageNo, 10));
    }

    @Override
    @Transactional
    public void deleteDonationByDonationNo(int donationNo) {
        Optional<Donation> donation = donationRepo.findDonationByDonationNo(donationNo);
        if (donation.isEmpty())
            throw new NonExistDonationException();
        donationRepo.deleteDonationByDonationNo(donationNo);
        Optional<DonationBoard> donationBoard = donationBoardRepo.findDonationBoardByBoardNo(donation.get().getBoardNo());
        donationBoard.ifPresent(board -> board.setAttainAmount(board.getAttainAmount() - donation.get().getDonateAmount()));
    }
}
