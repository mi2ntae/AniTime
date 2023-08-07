import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
//   import { useDispatch } from "react-redux";
import { css, styled } from "styled-components";
//   import { setMeetingNo } from "reducer/shelterMeeting";
//   import { Button } from "styled/styled";
import http from "api/commonHttp";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "reducer/chatRoom";

export default function ChattingList() {
  const dispatch = useDispatch();

  const memberKind = useSelector((state) => state.member.memberKind);
  const memberNo = useSelector((state) => state.member.memberNo);
  
  const [chatList, setChatList] = useState([]);

  // const dispatch = useDispatch();

  useEffect(() => {
    http.get(`chat/room/${memberKind}/${memberNo}`)
    .then((res) => {
      console.log(res.data)
      setChatList(res.data);
    })
    .catch((err) => {
      console.log("ddd");
    })
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #E8EBEE",
        }}
      >
        <Box
          sx={{
            height: "72px",
            width: "100%",
            borderBottom: "1px solid #E8EBEE",
          }}
        >
          <Text>
            <Font1>메시지</Font1>
          </Text>
        </Box>
        <Box2>
          {chatList.map((item) => (
            <ChatPreview key={item.roomNo} onClick={() => dispatch(setRoom({roomNo: item.roomNo, name: item.name}))}>
              {/* onClick={() => dispatch(setChatList(item.roomNo))} */}
              <Div>
                <ShelterName>{item.name}</ShelterName>
              </Div>
              <Div>
                <LastMsg>{item.lastMsg.length > 25 ? item.lastMsg.substr(0, 25)+"..." : item.lastMsg}</LastMsg>
                {item.unreadCnt !== 0 ? (
                  <Cnt unreadCnt={item.unreadCnt}>{item.unreadCnt}</Cnt>
                ) : null}
              </Div>
            </ChatPreview>
          ))}
        </Box2>
      </Box>
    </>
  );
}

const ShelterName = styled.span`
  color: var(--blackgrey, #35383b);
  font-size: 14px;
  font-weight: 400;
`;

const Font1 = styled.span`
  color: var(--blackgrey, #35383b);
  font-size: 20px;
  font-weight: 700;
  align-items: center;
  display: flex;
`;
const Text = styled.div`
  padding-left: 32px;
  height: 72px;
  display: flex;
`;
const LastMsg = styled.span`
  color: var(--darkgrey, #7d848a);
  font-size: 12px;
`;
const LastDate = styled.span`
  color: var(--grey-2, #a7aeb4);
  text-align: right;
  font-size: 12px;
  font-weight: 400;
`;
const Cnt = styled.span`
  variant: outlined;
  width: 18px;
  height: 18px;
  background-color: #ff7676;
  color: white;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${({ unreadCnt }) =>
    unreadCnt >= 100 ? "30%" : unreadCnt > 0 ? "50%" : "null"};
`;
const ChatPreview = styled.div`
  height: 72px;
  max-height: 15%;
  padding: 16px;
  flex: 1;
  display: flex;
  gap: 7px;
  flex-direction: column;
  background-color: var(--lightestgrey, #f7f8fa);
  border-radius: 10px;

`;
const Box2 = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 16px;
  ${css`
    &::-webkit-scrollbar {
      display: none;
    }
  `}
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
