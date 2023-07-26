package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.model.service.chat.ChatService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "채팅 API", tags = {"Chat"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class ChatController {
    private final ResponseService responseService;
    private final ChatService chatService;
    private final SimpMessagingTemplate smso;


    @GetMapping("/{memberNo}")
    public ListResponse getChatRoomsByMemberNo(@PathVariable int memberNo) {
        return responseService.getListResponse(chatService.getRoomsByMemberNo(memberNo));
    }
//    @GetMapping("/{roomId}")
//    public List<ChatMessage> getChatsByRoomId(@PathVariable int roomId) {
//        return service.getChatsByRoomId(roomId);
//    }
//    @GetMapping("/room/{userId}/{tripId}")
//    public ResponseEntity<ChatRoom> getRoomByUserIdAndTripId(@PathVariable String userId, @PathVariable int tripId) throws SQLException{
//        return ResponseEntity.ok(service.getRoomByUserIdAndTripId(userId,tripId));
//    }
//    @DeleteMapping("/room/{userId}/{roomId}")
//    public ResponseEntity<Void> deleteUserRoom(@PathVariable String userId, @PathVariable int roomId) throws SQLException{
//        ChatMessage message = new ChatMessage();
//        message.setRoomId(roomId);
//        message.setWriter(userId);
//        message.setType(ChatMessage.MessageType.LEAVE);
//        smso.convertAndSend("/sub/"+message.getRoomId(), message);
//        service.deleteUserRoom(userId, roomId);
//        return ResponseEntity.ok().build();
//    }
//    @PostMapping
//    public ResponseEntity<Void> intoRoom(@RequestBody UserChatroom userChatroom) throws SQLException {
//        service.intoRoom(userChatroom);
//        ChatMessage message = new ChatMessage();
//        message.setRoomId(userChatroom.getRoomId());
//        message.setWriter(userChatroom.getUserId());
//        message.setType(ChatMessage.MessageType.JOIN);
//        smso.convertAndSend("/sub/"+message.getRoomId(), message);
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/trip/{tripId}")
//    public ResponseEntity<ChatRoom> getRoomId(@PathVariable int tripId) throws SQLException {
//        return ResponseEntity.ok(service.getRoomId(tripId));
//    }
//    @PostMapping("/create")
//    public ResponseEntity<Void> createRoom(@RequestBody Trip trip) throws SQLException{
//        service.createRoom(trip);
//        return ResponseEntity.ok().build();
//    }
}

