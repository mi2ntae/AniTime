package com.moi.anitime.model.service.meeting;

import com.moi.anitime.api.request.meeting.MeetingReq;
import com.moi.anitime.api.response.meeting.MeetingListRes;
import com.moi.anitime.model.entity.adoptionForm.AdoptionForm;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.meeting.Meeting;
import com.moi.anitime.model.entity.member.Member;
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

import javax.swing.text.html.Option;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService{
    private final MeetingRepo meetingRepo;
    private final MemberRepo memberRepo;
    private final AnimalRepo animalRepo;
    private final AdoptionFormRepo adoptionFormRepo;
    private final S3Uploader s3Uploader;

    @Value("${adoptionForm.path}")
    private String imgPath;

    @Transactional
    @Override
    public void reserveMeeting(MeetingReq meetingReq, MultipartFile img) throws IOException {
        Member member = memberRepo.getReferenceById(meetingReq.getGeneralNo());
        Animal animal = animalRepo.getReferenceById(meetingReq.getDesertionNo());
        Meeting meeting = meetingReq.toEntity(animal, member);
        if(img != null){
            String storedPath = s3Uploader.upload(img, imgPath);
            AdoptionForm form = AdoptionForm.builder()
                    .animal(animal)
                    .member(member)
                    .image(storedPath)
                    .build();
            adoptionFormRepo.save(form);
        }
        meetingRepo.save(meeting);
    }

    @Override
    public Page<MeetingListRes> findMeetingByGeneralNo(int generalNo, int page){
        Page<Meeting> meetList = meetingRepo.findMeetingsByMember_MemberNoOrderByReservedDateDesc(generalNo, PageRequest.of(page, 8));
        List<MeetingListRes> meets = new ArrayList<>();


        for(Meeting meet : meetList) {
            System.out.println(meet);
            String shelterName = memberRepo.findShelterMemberByMemberNo(meet.getAnimal().getShelterNo()).get().getName();
            MeetingListRes newMeet = MeetingListRes.builder()
                    .meetNo(meet.getMeetNo())
                    .meetContent(meet.getAnimal().getProcessState())
                    .reservedDate(meet.getReservedDate())
                    .desertionNo(meet.getAnimal().getDesertionNo())
                    .shelterName(shelterName)
                    .state(meet.getStatus())
                    .build();
            meets.add(newMeet);
        }
        return new PageImpl<>(meets, meetList.getPageable(), meetList.getTotalElements());
    }



}
