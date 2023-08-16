package com.moi.anitime.model.service.notice;

import com.moi.anitime.api.request.notice.NoticeReq;
import com.moi.anitime.exception.notice.*;
import com.moi.anitime.model.entity.notice.Notice;
import com.moi.anitime.model.repo.ChatMessageRepo;
import com.moi.anitime.model.repo.MeetingRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.model.repo.NoticeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class NoticeServiceImpl implements NoticeService{
    private final NoticeRepo noticeRepo;
    private final MemberRepo memberRepo;
    private final ChatMessageRepo chatMessageRepo;
    private final MeetingRepo meetingRepo;

    @Override
    public void generateNotice(NoticeReq noticeReq) throws NoticeGenerationException {
        String generalMemberName=(noticeReq.getGeneralNo()==0)?"": memberRepo.findNameByMemberNo(noticeReq.getGeneralNo());
        String shelterMemberName=(noticeReq.getShelterNo()==0)?"":memberRepo.findNameByMemberNo(noticeReq.getShelterNo());
        String noticeContent;
        String reservationDate;
        int kind= noticeReq.getNoticeKind();
        LocalDateTime noticeTime;
        boolean noticeCheck=false;
        Notice notice = null;
        String userName;
        int memberNo;
        if(generalMemberName.length()>0){
            userName=generalMemberName;
            memberNo=noticeReq.getGeneralNo();
        }else{1
            userName=shelterMemberName;
            memberNo=noticeReq.getShelterNo();
        }
        switch(kind){
            case 0://읽지 않은 채팅-ㅇㅇ님, 읽지 않은 채팅이 ㅁㅁ건 있습니다.
                int cnt;
                if(generalMemberName.length()>0){
                    cnt= chatMessageRepo.getUnreadedMessagesByGeneralNo(memberNo);
                }else{
                    cnt= chatMessageRepo.getUnreadedMessagesByShelterNo(memberNo);
                }
                noticeContent=userName+"님, 읽지 않은 채팅이 "+cnt+"건 있습니다.";
                notice=noticeReq.toEntity(memberNo,noticeContent);
                break;
            case 1://미팅-ㅇㅇ님의 ㅁㅁ보호소 미팅 예약(ㅍㅍ일 ㅍㅍ시 ㅍㅍ분)이 (상태)되었습니다.
                reservationDate=DateTimeFormatter.ofPattern("yyyy년 M월 d일 HH시 mm분").format(LocalDateTime.parse(noticeReq.getReservedDate()));
                switch (noticeReq.getStatus()){
                    case 0://예약-일반 회원, 보호소 회원 모두에게 미팅 신청 메시지 보냄
                        noticeContent=generalMemberName+"님의 "+shelterMemberName+" 미팅 예약("+reservationDate+")이 신청되었습니다.";
                        notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                        noticeRepo.save(notice);
                        noticeContent=generalMemberName+"님이 미팅 예약("+reservationDate+")을 신청하였습니다.";
                        notice=noticeReq.toEntity(noticeReq.getShelterNo(),noticeContent);
                        noticeRepo.save(notice);
                        return;
                    case 1://승인-일반 회원에게 승인 메시지 보냄
                        noticeContent=generalMemberName+"님의 "+shelterMemberName+" 미팅 예약("+reservationDate+")이 승인되었습니다.";
                        notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                        break;
                    case 2://반려-일반 회원에게 반려 메시지 보냄
                        noticeContent=generalMemberName+"님의 "+shelterMemberName+" 미팅 예약("+reservationDate+")이 반려되었습니다.";
                        notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                        break;
                    case 3://임박-일반 회원, 보호소 회원 모두에게 미팅 임박 메시지 보냄
                        noticeContent=generalMemberName+"님의 "+shelterMemberName+" 미팅("+reservationDate+") 한 시간 전입니다.";
                        notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent,true);
                        noticeRepo.save(notice);
                        noticeContent=generalMemberName+"님과의 미팅("+reservationDate+") 한 시간 전입니다.";
                        notice=noticeReq.toEntity(noticeReq.getShelterNo(),noticeContent,true);
                        noticeRepo.save(notice);
                        return;
                    case 4://회원별 금일 미팅 건수
                        if(generalMemberName.length()>0){
                            cnt=meetingRepo.countMeetingTodayByGeneralNo(noticeReq.getGeneralNo());
                        }else{
                            cnt=meetingRepo.countMeetingTodayByShelterNo(noticeReq.getShelterNo());
                        }
                        noticeContent=userName+"님의 금일 미팅 건수는 "+cnt+"건입니다.";
                        notice=noticeReq.toEntity(memberNo,noticeContent);

                        break;
                    default:throw new NoticeGenerationException();
                }
                break;
            case 2://실종-시스템 정보 갱신
                noticeContent="업데이트 된 실종 동물 관련 정보를 확인해 보세요.";
                notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                break;
            case 3://후원
                noticeContent=shelterMemberName+"에 "+noticeReq.getAmount()+"원 후원 완료되었습니다.";
                notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                noticeRepo.save(notice);
                noticeContent=generalMemberName+"님이 "+noticeReq.getAmount()+"원 후원하였습니다.";
                notice=noticeReq.toEntity(noticeReq.getShelterNo(),noticeContent);
                noticeRepo.save(notice);
                return;
            default:throw new NoticeGenerationException();
        }
        noticeRepo.save(notice);
        return;
    }
    @Override
    public List<Notice> getNoticeList(int memberNo) throws LoadNoticeException {
        return noticeRepo.findNoticesByMemberNoOrderByNoticeTimeDesc(memberNo);
    }

    @Override
    @Transactional
    public void readNotice(int noticeNo) throws ReadNoticeException {
        Notice notice = noticeRepo.findNoticeByNoticeNo(noticeNo);
        notice.setNoticeCheck(true);
    }

    @Override
    public int countUnreadedNotice(int memberNo) throws CountNoticeException {
        return noticeRepo.countByMemberNoAndNoticeCheck(memberNo,false);
    }

    @Override
    public void deleteAllNotice(int memberNo) throws DeleteNoticeException {
        noticeRepo.deleteAllByMemberNo(memberNo);
    }
}
