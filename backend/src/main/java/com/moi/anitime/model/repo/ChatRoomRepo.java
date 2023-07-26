package com.moi.anitime.model.repo;

import com.moi.anitime.api.response.ChatRoomResponse;
import com.moi.anitime.model.entity.chat.ChatRoom;
import com.moi.anitime.model.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepo extends JpaRepository<ChatRoom, Integer> {
    @Query(name = "findChatRoomsByGeneralNo", nativeQuery = true)
    List<ChatRoomResponse> findChatRoomsByGeneralNo(@Param("generalno") int generalNo);

    @Query(name = "findChatRoomsByShelterNo", nativeQuery = true)
    List<ChatRoomResponse> findChatRoomsByShelterNo(@Param("shelterno") int shelterNo);

}
