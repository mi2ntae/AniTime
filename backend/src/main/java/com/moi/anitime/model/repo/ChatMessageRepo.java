package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepo extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findChatMessageByChatRoom_RoomNoOrderByWrittenTimeAsc(@Param("roomNo") int roomNo);

    @Modifying
    @Query(name = "updateChatMessagesRead", nativeQuery = true)
    void updateChatMessagesRead(@Param("roomno") int roomNo, @Param("sendno") int sendNo);
}
