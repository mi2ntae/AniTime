package com.moi.anitime.model.repo;

import com.moi.anitime.api.response.chat.ChatRoomListRes;
import com.moi.anitime.model.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepo extends JpaRepository<ChatRoom, Integer> {
    @Query(name = "findChatRoomsByGeneralNo", nativeQuery = true)
    List<ChatRoomListRes> findChatRoomsByGeneralNo(@Param("generalno") int generalNo);

    @Query(name = "findChatRoomsByShelterNo", nativeQuery = true)
    List<ChatRoomListRes> findChatRoomsByShelterNo(@Param("shelterno") int shelterNo);

    Optional<ChatRoom> findChatRoomByGeneralMember_MemberNoAndShelterMember_MemberNo(@Param("generalno") int generalNo, @Param("shelterno") int shelterNo);
}
