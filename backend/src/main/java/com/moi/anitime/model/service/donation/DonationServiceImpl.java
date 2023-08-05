package com.moi.anitime.model.service.donation;

import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.api.response.donation.DonationBoardListRes;
import com.moi.anitime.api.response.donation.DonationBoardRes;
import com.moi.anitime.api.response.donation.DonationBoardsListForShelterRes;
import com.moi.anitime.api.response.donation.DonationListRes;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.donation.Donation;
import com.moi.anitime.model.entity.donation.DonationBoard;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.repo.DonationBoardRepo;
import com.moi.anitime.model.repo.DonationRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Formatter;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

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
    public DonationBoardRes findDonationBoardByBoardNo(int boardNo) {
        Optional<DonationBoard> res = donationBoardRepo.findDonationBoardByBoardNo(boardNo);
        if (res.isEmpty()) throw new NonExistDonationBoardException();
        DonationBoard board = res.get();

        DonationBoardRes donationBoardRes = DonationBoardRes.builder()
                .title(board.getTitle())
                .dDay(Period.between(LocalDate.now(), board.getEndAt()).getDays())
                .thumbnail(board.getImage1())
                .attain(board.getAttainAmount())
                .goal(board.getGoalAmount())
                .detail(board.getPoster())
                .build();

        return donationBoardRes;
    }

    @Override
    public Page<DonationBoardsListForShelterRes> findDonationBoardsByShelter_MemberNo(int shelterNo, int curPageNo) {
        if (memberRepo.findShelterMemberByMemberNo(shelterNo).isEmpty())
            throw new NonExistMemberNoException();
        Page<DonationBoard> res =  donationBoardRepo.findDonationBoardsByShelter_MemberNo(shelterNo, PageRequest.of(curPageNo, 10));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        List<DonationBoardsListForShelterRes> data = res.getContent().stream()
                .map(board -> {
                    DonationBoardsListForShelterRes donationBoardsListForShelterRes = DonationBoardsListForShelterRes.builder()
                            .title(board.getTitle())
                            .date(board.getStartAt().format(formatter) + " ~ " + board.getEndAt().format(formatter))
                            .attained(board.getAttainAmount() + "원")
                            .goal(board.getGoalAmount() + "원")
                            .boardNo(board.getBoardNo())
                            .build();

                    if (LocalDate.now().isBefore(board.getStartAt())) donationBoardsListForShelterRes.setStatus(0);
                    else if (!LocalDate.now().isAfter(board.getEndAt())) donationBoardsListForShelterRes.setStatus(1);
                    else if (board.getAttainAmount() >= board.getGoalAmount()) donationBoardsListForShelterRes.setStatus(2);
                    else if (board.getAttainAmount() < board.getGoalAmount()) donationBoardsListForShelterRes.setStatus(3);
                    return donationBoardsListForShelterRes;
                })
                .collect(Collectors.toList());

        Page<DonationBoardsListForShelterRes> response = new PageImpl<>(data, res.getPageable(), res.getTotalElements());
        return response;
    }

    @Override
    public Page<DonationBoardListRes> findDonationBoards(String title, String name, int curPageNo) {
        Page<DonationBoard> res =  donationBoardRepo.findDonationBoards(title, name, PageRequest.of(curPageNo, 10));

        List<DonationBoardListRes> data = res.getContent().stream()
                .map(board -> {
                    int cal = board.getAttainAmount() / board.getGoalAmount() * 100;
                    DonationBoardListRes donationBoardListRes = DonationBoardListRes.builder()
                            .thumbnail(board.getImage1())
                            .title(board.getTitle())
                            .shelter(board.getShelter().getName())
                            .dDay(Period.between(LocalDate.now(), board.getEndAt()).getDays())
                            .achievement(cal)
                            .attained(board.getAttainAmount() + "원")
                            .goal(board.getGoalAmount() + "원")
                            .build();
                    return donationBoardListRes;
                }).collect(Collectors.toList());

        return new PageImpl<>(data, res.getPageable(), res.getTotalElements());
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
    public Page<DonationListRes> findDonationsByBoardNo(int boardNo, int curPageNo) {
        if (donationBoardRepo.findDonationBoardByBoardNo(boardNo).isEmpty())
            throw new NonExistDonationBoardException();
        Page<Donation> res = donationRepo.findDonationsByBoardNo(boardNo, PageRequest.of(curPageNo, 10));

        List<DonationListRes> data = res.getContent().stream()
                .map(donation -> {
                    DonationListRes donationListRes = DonationListRes.builder()
                            .donationDate(donation.getDonateDate().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")))
                            .money(donation.getDonateAmount() + "원").build();
                    Optional<Member> member = memberRepo.findById(donation.getGeneralNo());
                    if (member.isPresent()) donationListRes.setMemberName(member.get().getName());
                    else donationListRes.setMemberName("익명");
                    return donationListRes;
                }).collect(Collectors.toList());

        return new PageImpl<>(data, res.getPageable(), res.getTotalElements());
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
