package com.moi.anitime.model.entity.chat;


import com.moi.anitime.model.entity.BaseTimeEntity;
import com.moi.anitime.model.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "chatmessage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "updateChatMessagesRead",
                query = "UPDATE ChatMessage SET isread = 1 WHERE roomno = :roomno AND sendno != :sendno"
        )
})
public class ChatMessage extends BaseTimeEntity {
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
    @Column(name="isread", columnDefinition = "TINYINT(3)")
    private boolean isread;

}
