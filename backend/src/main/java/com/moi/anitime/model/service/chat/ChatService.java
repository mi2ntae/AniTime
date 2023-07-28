package com.moi.anitime.model.service.chat;

import com.moi.anitime.api.request.chat.ChatMessageReq;
import com.moi.anitime.api.response.chat.ChatRes;
import com.moi.anitime.api.response.chat.ChatRoomInitRes;
import com.moi.anitime.api.response.chat.ChatRoomListRes;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.exception.chat.UnknownMemberKindException;

import java.util.List;

public interface ChatService {
    public List<ChatRoomListRes> getRoomsByMemberNo(int memberKind, int memberNo) throws UnknownMemberKindException;
    public ChatRoomInitRes initChatRoom(int generalNo, int desertionNo) throws NonExistDesertionNoException;
    public List<ChatRes> enterChatRoom(int memberNo, int roomNo) throws NonExistDesertionNoException;
    public ChatRes sendChat(ChatMessageReq message);
}
