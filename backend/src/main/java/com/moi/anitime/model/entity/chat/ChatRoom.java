package com.moi.anitime.model.entity.chat;

import com.moi.anitime.model.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "chatroom")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomno")
    private int roomNo;
    @ManyToOne
    @JoinColumn(name = "generalno")
    private Member generalMember;
    @ManyToOne
    @JoinColumn(name = "shelterno")
    private Member shelterMember;
}
