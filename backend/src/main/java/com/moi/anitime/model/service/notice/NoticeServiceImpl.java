package com.moi.anitime.model.service.notice;

import com.moi.anitime.api.request.notice.NoticeReq;
import com.moi.anitime.model.entity.notice.Notice;
import com.moi.anitime.model.repo.ChatMessageRepo;
import com.moi.anitime.model.repo.MemberRepo;
import com.moi.anitime.model.repo.NoticeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
@Slf4j
public class NoticeServiceImpl implements NoticeService{
    private final NoticeRepo noticeRepo;
    private final MemberRepo memberRepo;
    private final ChatMessageRepo chatMessageRepo;

    @Override
    public void generateNotice(NoticeReq noticeReq) {
//        여기서 noticeContent 작성해야 함
        String generalMemberName=(noticeReq.getGeneralNo()==0)?"": memberRepo.findNameByMemberNo(noticeReq.getGeneralNo());
        String shelterMemberName=(noticeReq.getShelterNo()==0)?"":memberRepo.findNameByMemberNo(noticeReq.getShelterNo());
        String noticeContent;
        String reservationDate;
        int kind= noticeReq.getNoticeKind();
        LocalDateTime noticeTime;
        boolean noticeCheck=false;
        Notice notice;
        String userName;
        switch(kind){
            case 0://읽지 않은 채팅-ㅇㅇ님, 읽지 않은 채팅이 ㅁㅁ건 있습니다.
                userName=generalMemberName.length()>0?generalMemberName:shelterMemberName;
                noticeContent=userName+"님, 읽지 않은 채팅이 "+chatMessageRepo.getUnreadedMessagesByMemberNo(noticeReq.getMemberNo())+"건 있습니다.";
                notice = noticeReq.toEntity(noticeContent);
                break;
            case 1://미팅-ㅇㅇ님의 ㅁㅁ보호소 미팅 예약(ㅍㅍ일 ㅍㅍ시 ㅍㅍ분)이 (상태)되었습니다.
                reservationDate=DateTimeFormatter.ofPattern("yyyy년 M월 d일 HH시 mm분").format(noticeReq.getReservedDate());
                switch (noticeReq.getStatus()){
                    case 0://예약-일반 회원, 보호소 회원 모두에게 미팅 신청 메시지 보냄
                        noticeContent=generalMemberName+"님의 "+shelterMemberName+" 미팅 예약"+reservationDate+"이 신청되었습니다.";
                        notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                        noticeRepo.save(notice);
                        noticeContent=generalMemberName+"님이 미팅 예약"+reservationDate+"을 신청하였습니다.";
                        notice=noticeReq.toEntity(noticeReq.getShelterNo(),noticeContent);
                        break;
                    case 1://승인-일반 회원에게 승인 메시지 보냄
                        noticeContent=generalMemberName+"님의 "+shelterMemberName+" 미팅 예약"+reservationDate+"이 승인되었습니다.";
                        notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                        noticeRepo.save(notice);
                        break;
                    case 2://반려-일반 회원에게 반려 메시지 보냄
                        noticeContent=generalMemberName+"님의 "+shelterMemberName+" 미팅 예약"+reservationDate+"이 반려되었습니다.";
                        notice=noticeReq.toEntity(noticeReq.getGeneralNo(),noticeContent);
                        noticeRepo.save(notice);
                        break;
                    case 3://임박-일반 회원, 보호소 회원 모두에게 미팅 임박 메시지 보냄
                        break;
                    case 4://회원별 금일 미팅 건수
                        userName=generalMemberName.length()>0?generalMemberName:shelterMemberName;
                        noticeContent=userName+"님의 금일 미팅 건수는 ";
                }
                break;
            case 2://실종-시스템 정보 갱신
                break;
            default:break;
        }
//        noticeRepo.save(notice);
        return;
    }
}
