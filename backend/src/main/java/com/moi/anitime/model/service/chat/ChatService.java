package com.moi.anitime.model.service.chat;

import com.moi.anitime.api.response.ChatRoomResponse;
import com.moi.anitime.exception.chat.UnknownMemberKindException;
import com.moi.anitime.model.entity.chat.ChatRoom;

import java.util.List;

public interface ChatService {
    public List<ChatRoomResponse> getRoomsByMemberNo(int memberKind, int memberNo) throws UnknownMemberKindException;


}
