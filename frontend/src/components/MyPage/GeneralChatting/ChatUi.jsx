import * as React from "react";
import { css, styled } from "styled-components";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import http from "../../../api/commonHttp";
import { useState } from "react";
import SockJs from "sockjs-client";
import Stomp from "webstomp-client";
import { setStomp } from "reducer/stomp";
import { setRoom, setSub } from "reducer/chatRoom";

export default function ChatUi({ width, height }) {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.stomp.socket);
  const stompClient = useSelector((state) => state.stomp.client);
  const [input, setInput] = useState("");
  const roomNo = useSelector((state) => state.chatRoom.roomNo);
  const roomName = useSelector((state) => state.chatRoom.name);
  const memberNo = useSelector((state) => state.member.memberNo);
  const [messages, setMessages] = useState([]);
  const sub = useSelector((state) => state.chatRoom.sub);

  var messageArea = null;

  useEffect(() => {
    messageArea = document.querySelector("#messageArea");
    messageArea.scrollTop = messageArea.scrollHeight;
  });

  const onConnected = () => {
    if(sub) {
      stompClient.unsubscribe("curRoom");
      
    }
    setTimeout(() => stompClient.subscribe(`/topic/room.${roomNo}`, onMessageReceived, {
      'id': "curRoom",
      'auto-delete':true, 
      'durable':false, 
      'exclusive':false
    }), 100);
    dispatch(setSub(true));
  };

  const onError = () => {
    // console.log("stomp error");
  };

  const resetReadCnt = async () => {
    await http
      .post(`chat/room/${roomNo}/${memberNo}`)
      .then((res) => {
        // console.log("Reset UnreadCnt When ChatRoom Activated");
      })
      .catch((err) => {
        // console.log("resetErr");
      });
  };

  const onMessageReceived = (payload) => {
    // console.log("messageReceive");
    setMessages((prev) => {
      // console.log(payload);
      return [...prev, JSON.parse(payload.body)];
    });
    resetReadCnt();
  };

  if (socket == null && stompClient == null) {
    let sock = new SockJs("http://localhost:8000/ws/chat");
    let client = Stomp.over(sock);
    dispatch(setStomp({ socket: sock, client: client }));
  }

  useEffect(() => {
    if (stompClient != null) stompClient.connect({}, onConnected, onError);
    return () => {
      if (stompClient != null) {
        stompClient.unsubscribe("curRoom");
        stompClient.disconnect();
        dispatch(setRoom({ roomNo: -1, name: "" }));
        dispatch(setStomp({ socket: null, client: null }));
        dispatch(setSub(false));
      }
    };
  }, [socket]);

  useEffect(() => {
    if (roomNo != -1) {
      http
        .get(`chat/room/${roomNo}?memberNo=${memberNo}`)
        .then((res) => {
          // console.log(res);
          setMessages(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    if (socket != null && stompClient != null) {
      if(sub) {
        stompClient.unsubscribe("curRoom");
        console.log("unsub!!")
        dispatch(setSub(true));
      }
      setTimeout(() => stompClient.subscribe(`/topic/room.${roomNo}`, onMessageReceived, {
        'id': "curRoom",
        'auto-delete':true, 
        'durable':false, 
        'exclusive':false
      }), 100);
    }
  }, [roomNo]);

  const handleSend = () => {
    if (input.trim() !== "") {
      // console.log(input);
      const message = {
        roomNo: roomNo,
        sendNo: memberNo,
        content: input,
      };
      stompClient.send("/pub/chat.message", JSON.stringify(message));
      setInput("");
    } // else console.log("메시지를 입력해주세요!");
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 동작 방지
      handleSend(e);
    }
  };

  const Message = ({ message }) => {
    const isMe = memberNo === message.sendNo ? true : false;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: !isMe ? "flex-start" : "flex-end",
          mb: 2.5,
        }}
      >
        {message.content.trim() ? (
          <>
            {!isMe ? null : <Time>{message.writtenTime}</Time>}
            <Paper
              elevation={0}
              sx={{
                p: 1,
                backgroundColor: isMe ? "#F7F8FA" : "#E1F0FF",
                borderRadius: isMe
                  ? "16px 16px 0px 16px"
                  : "16px 16px 16px 0px",
                maxWidth: "60%",
                padding: "16px",
                wordWrap: "break-word",
                textAlign: "start",
                whiteSpace: "pre-line",
              }}
            >
              <Typography
                variant="body1"
                style={{
                  color: "var(--blackgrey, #35383B)",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                }}
              >
                {message.content}
              </Typography>
            </Paper>
            {!isMe ? <Time>{message.writtenTime}</Time> : null}
          </>
        ) : null}
      </Box>
    );
  };

  return (
    <ChatBox
      $width={width}
      $height={height}
      display="flex"
      flexDirection="column"
      border="1px solid #E8EBEE"
      background_color="white"
    >
      <ChatHeader>
        <Text>
          <Font1>{roomName}</Font1>
        </Text>
      </ChatHeader>
      <Box2 id="messageArea">
        {messages.map((message) => (
          <li>
            <Message key={message.chatNo} message={message} />
          </li>
        ))}
      </Box2>
      <Box
        sx={{
          p: 2,
          backgroundColor: "background.default",
          borderTop: "1px solid #E8EBEE",
          display: "flex",
          height: "72px",
          padding: "0",
        }}
      >
        <InputText
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
        />
        <Button
          onClick={handleSend}
          style={{ padding: "16px", backgroundColor: "white", border: "0px" }}
        >
          <img src="/icons/ic_send.svg" />
        </Button>
      </Box>
    </ChatBox>
  );
}

const Font1 = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Text = styled.div`
  padding: 24px 32px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Time = styled.span`
  font-size: 10px;
  display: flex;
  align-items: flex-end;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  color: black;
`;
const Box2 = styled.ul`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 20px;
  ${css`
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;
const InputText = styled.textarea`
  outline: none;
  border: none;
  padding: 16px;
  flex-grow: 1;
  margin-right: 10px;
  color: var(--blackgrey, #35383b);
  font-size: 14px;
  // font-weight: bold;
  resize: none;
`;

const ChatBox = styled(Box)`
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  background-color: ${({ background_color }) => background_color || "#3994F0"};
  color: ${({ color }) => color || "white"};
  display: ${({ display }) => display || "flex"};
`;

const ChatHeader = styled(Box)`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  min-height: 72px;
  background-color: ${({ background_color }) => background_color || "#3994F0"};
  color: ${({ color }) => color || "white"};
  display: ${({ display }) => display || "flex"};
`;
