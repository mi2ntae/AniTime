package com.moi.anitime.model.service.meet;

import com.moi.anitime.api.request.meeting.MeetingReq;
import com.moi.anitime.api.request.meeting.MeetingStatusReq;
import com.moi.anitime.api.response.meeting.MeetingListRes;
import com.moi.anitime.api.response.meeting.MeetingRes;
import com.moi.anitime.exception.meeting.NonExistMeetNoException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.adoptionForm.AdoptionForm;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.meeting.Meeting;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.MemberKind;
import com.moi.anitime.model.repo.AdoptionFormRepo;
import com.moi.anitime.model.repo.AnimalRepo;
import com.moi.anitime.model.repo.MeetingRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {
    private final MeetingRepo meetingRepo;
    private final MemberRepo memberRepo;
    private final AnimalRepo animalRepo;
    private final AdoptionFormRepo adoptionFormRepo;
    private final S3Uploader s3Uploader;

    @Value("${adoptionForm.path}")
    private String imgPath;

    @Transactional
    @Override
    public void reserveMeet(MeetingReq meetingReq, MultipartFile img) throws IOException {
        Member member = memberRepo.getReferenceById(meetingReq.getGeneralNo());
        Animal animal = animalRepo.getReferenceById(meetingReq.getDesertionNo());
        Meeting meeting = meetingReq.toEntity(animal, member);
        meeting = meetingRepo.save(meeting);
        if(img != null){
            String storedPath = s3Uploader.upload(img, imgPath);
            AdoptionForm form = AdoptionForm.builder()
                    .meeting(meeting)
                    .image(storedPath)
                    .build();
            adoptionFormRepo.save(form);
        }

    }

    @Override
    public Page<MeetingListRes> findMeetsByMemberNo(int memberno, int page) throws NonExistMemberNoException{
        Optional<Member> member = memberRepo.findById(memberno);
        if(!member.isPresent()) throw new NonExistMemberNoException();
        int memberKind = member.get().getMemberKind();

        Page<Meeting> meetList;
        if(memberKind == MemberKind.GENERAL.getCode()) meetList = meetingRepo.findMeetingsByMember_MemberNoOrderByReservedDateDesc(memberno, PageRequest.of(page, 8));
        else meetList = meetingRepo.findMeetingsByAnimal_ShelterNoOrderByReservedDateDesc(memberno, PageRequest.of(page, 8));

        List<MeetingListRes> meets = new ArrayList<>();
        for(Meeting meet : meetList) {
            String name;
            if(memberKind == MemberKind.GENERAL.getCode()) name = memberRepo.findShelterMemberByMemberNo(meet.getAnimal().getShelterNo()).get().getName();
            else name = memberRepo.findNameByMemberNo(meet.getMember().getMemberNo());
            MeetingListRes newMeet = MeetingListRes.builder()
                    .meetNo(meet.getMeetNo())
                    .meetContent(meet.getAnimal().getProcessState())
                    .reservedDate(meet.getReservedDate())
                    .desertionNo(meet.getAnimal().getDesertionNo())
                    .name(name)
                    .state(meet.getStatus())
                    .url(meet.getUrl())
                    .build();
            meets.add(newMeet);
        }
        return new PageImpl<>(meets, meetList.getPageable(), meetList.getTotalElements());
    }

    @Override
    public MeetingRes findMeetByMeetNo(int meetNo) {
        Optional<Meeting> tmpMeet = meetingRepo.findById(meetNo);
        if(!tmpMeet.isPresent()) throw new NonExistMeetNoException();
        Meeting meet = tmpMeet.get();
        Optional<AdoptionForm> adoptionForm = adoptionFormRepo.findAdoptionFormByMeeting_MeetNo(meet.getMeetNo());
        MeetingRes meetingRes = MeetingRes.builder()
                .meet(meet)
                .adoptionForm(adoptionForm.isPresent() ? adoptionForm.get().getImage() : "")
                .build();
        return meetingRes;
    }

    @Override
    public void setMeetState(int meetNo, MeetingStatusReq meetingStatusReq) throws NonExistMeetNoException{
        Optional<Meeting> tmpMeet = meetingRepo.findById(meetNo);
        if(!tmpMeet.isPresent()) throw new NonExistMeetNoException();
        Meeting meet = tmpMeet.get();
        meet.setStatus(meetingStatusReq.isStatus() ? 1 : 2);
        StringBuilder sb = new StringBuilder();
        sb.append(meet.getReservedDate().toString()).append("_").append(meet.getAnimal().getShelterNo()).append("_").append(meet.getMember().getMemberNo());
        if(!meetingStatusReq.isStatus()) meet.setReason(meetingStatusReq.getReason());
        else meet.setUrl(sb.toString());
        System.out.println(sb);

        meetingRepo.save(meet);
    }

    @Override
    public int countMeetsByNow(int memberNo) throws NonExistMemberNoException{
        LocalDateTime start = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0));
        LocalDateTime end = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59));
        Optional<Member> member = memberRepo.findById(memberNo);
        if(!member.isPresent()) throw new NonExistMemberNoException();
        int memberKind = member.get().getMemberKind();
        if(memberKind == MemberKind.GENERAL.getCode()) return meetingRepo.countMeetingByReservedDateBetweenAndMember_MemberNo(start, end, memberNo);
        else return meetingRepo.countMeetingByReservedDateBetweenAndAnimal_ShelterNo(start, end, memberNo);
    }

    @Override
    public Map<Integer, Boolean> getPossibleTime(int shelterNo, int month, int day) {
        Map<Integer, Boolean> map = new HashMap<>();
        LocalDate getDate = LocalDate.of(2023, month, day);
        List<Meeting> meets = meetingRepo.findMeetingsByAnimal_ShelterNoAndMonthAndDay(shelterNo, getDate);
        for(int i = 0; i < 24; i++) map.put(i, true);
        for(Meeting meet : meets) {
            int hour = meet.getReservedDate().getHour();
            map.put(hour, false);
        }
        return map;
    }
}
