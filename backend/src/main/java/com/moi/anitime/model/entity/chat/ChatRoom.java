package com.moi.anitime.model.entity.chat;

import com.moi.anitime.api.response.ChatRoomResponse;
import com.moi.anitime.model.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "chatroom")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "findChatRoomsByGeneralNo",
                query = "SELECT " +
                        "chatroom.roomNo AS roomno, member.name AS shelterName, (SELECT content from chatMessage WHERE chatmessage.roomNo = chatroom.roomNo ORDER BY chatmessage.writtentime DESC LIMIT 1) AS lastmsg, " +
                        "(SELECT COUNT(*) FROM chatmessage WHERE chatmessage.roomNo = chatroom.roomNo AND chatMessage.sendNo != 4 AND chatmessage.read = 0) AS unreadcnt " +
                        "from chatroom " +
                        "join Member on ChatRoom.shelterNo = Member.memberNo " +
                        "join ChatMessage on ChatRoom.roomNo = ChatMessage.roomNo " +
                        "where " +
                        "ChatRoom.generalNo = :generalno " +
                        "GROUP BY chatroom.roomNo;",
                resultSetMapping = "findChatRoomsByGeneralNo"
        )
})
@SqlResultSetMapping(
        name = "findChatRoomsByGeneralNo",
        classes = @ConstructorResult(
                targetClass = ChatRoomResponse.class,
                columns = {
                        @ColumnResult(name = "roomNo", type = Integer.class),
                        @ColumnResult(name = "shelterName", type = String.class),
                        @ColumnResult(name = "lastMsg", type = String.class),
                        @ColumnResult(name = "unreadCnt", type = Integer.class)

                }
        )
)
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
