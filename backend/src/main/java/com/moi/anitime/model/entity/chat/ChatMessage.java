package com.moi.anitime.model.entity.chat;


import com.moi.anitime.model.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity(name = "chatmessage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatno")
    private int chatNo;
    @ManyToOne
    @JoinColumn(name = "roomno")
    private ChatRoom chatRoom;
    private String content;
    private int type;
    @ManyToOne
    @JoinColumn(name = "sendno")
    private Member sender;
    @Column(name = "writtentime")
    @CreatedDate
    private LocalDateTime writtenTime;
    @Column(columnDefinition = "TINYINT(3)")
    private boolean read;
}
