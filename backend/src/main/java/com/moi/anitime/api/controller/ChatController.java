package com.moi.anitime.api.controller;

import com.moi.anitime.api.ResponseService;
import com.moi.anitime.api.response.ListResponse;
import com.moi.anitime.api.response.SingleResponse;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.model.service.chat.ChatService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@Api(value = "채팅 API", tags = {"Chat"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ResponseService responseService;
    private final ChatService chatService;
    private final SimpMessagingTemplate smso;


    @GetMapping("/room/{memberKind}/{memberNo}")
    public ListResponse getChatRoomsByMemberNo(@PathVariable int memberKind, @PathVariable int memberNo) {
        return responseService.getListResponse(chatService.getRoomsByMemberNo(memberKind, memberNo));
    }

    @PostMapping("/room")
    public SingleResponse initChatRoom(@RequestParam("generalNo") int generalNo, @RequestParam("desertionNo") int desertionNo) throws NonExistDesertionNoException {
        return responseService.getSingleResponse(chatService.initChatRoom(generalNo, desertionNo));
    }

    @GetMapping("/room/{roomNo}")
    public ListResponse getChatsByRoomNo(@PathVariable int roomNo, @RequestParam("memberNo") int memberNo) {
        return responseService.getListResponse(chatService.enterChatRoom(memberNo, roomNo));
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

