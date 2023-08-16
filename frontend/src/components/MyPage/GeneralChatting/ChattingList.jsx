import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
//   import { useDispatch } from "react-redux";
import { css, styled } from "styled-components";
//   import { setMeetingNo } from "reducer/shelterMeeting";
//   import { Button } from "styled/styled";
import http from "api/commonHttp";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "reducer/chatRoom";

export default function ChattingList({ update }) {
  const dispatch = useDispatch();

  const memberKind = useSelector((state) => state.member.memberKind);
  const memberNo = useSelector((state) => state.member.memberNo);

  const [chatList, setChatList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const roomNo = useSelector((state) => state.chatRoom.roomNo);
  console.log("list: " + update);
  // const dispatch = useDispatch();

  useEffect(() => {
    http
      .get(`chat/room/${memberKind}/${memberNo}`)
      .then((res) => {
        // console.log(res.data);
        setChatList(res.data);
      })
      .catch((err) => {
        // console.log("ddd");
      });
  }, [update]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
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
          {chatList.length === 0 ? (
            <NoListMsg>진행중인 채팅이 없습니다.</NoListMsg>
          ) : (
            chatList.map((item, idx) => (
              <ChatPreview
                key={item.roomNo}
                onClick={() => {
                  dispatch(setRoom({ roomNo: item.roomNo, name: item.name }));
                  setActiveIndex(item.roomNo);
                  const updatedChatList = chatList.map((chatRoom) => {
                    if (chatRoom.roomNo === item.roomNo) {
                      return { ...chatRoom, unreadCnt: 0 };
                    }
                    return chatRoom;
                  });
                  setChatList(updatedChatList);
                }}
                className={activeIndex === item.roomNo ? "active" : ""}
              >
                <Div>
                  <ShelterName>{item.name}</ShelterName>
                  <LastDate>{item.lastTime}</LastDate>
                </Div>
                <Div>
                  <LastMsg>
                    {item.lastMsg.length > 25
                      ? item.lastMsg.substr(0, 25) + "..."
                      : item.lastMsg}
                  </LastMsg>
                  {item.unreadCnt !== 0 ? (
                    item.unreadCnt > 9 ? (
                      item.unreadCnt > 99 ? (
                        item.unreadCnt > 300 ? (
                          <Cnt4>300+</Cnt4>
                        ) : (
                          <Cnt3>{item.unreadCnt}</Cnt3>
                        )
                      ) : (
                        <Cnt2>{item.unreadCnt}</Cnt2>
                      )
                    ) : (
                      <Cnt>{item.unreadCnt}</Cnt>
                    )
                  ) : null}
                </Div>
              </ChatPreview>
            ))
          )}
        </Box2>
      </Box>
    </>
  );
}
const ShelterName = styled.span`
  color: var(--blackgrey, #35383b);
  font-size: 15px;
  font-weight: bold;
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
  font-size: 14px;
`;

const NoListMsg = styled.span`
  color: #35383b;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const LastDate = styled.span`
  color: var(--grey-2, #a7aeb4);
  text-align: right;
  font-size: 12px;
  margin-right: 30px;
`;
const Cnt = styled.span`
  variant: outlined;
  width: 22px;
  height: 22px;
  background-color: #ff7676;
  color: white;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 30px;
  border-radius: 50%;
`;
const Cnt2 = styled.span`
  width: 31px;
  height: 22px;
  padding: 0px 0px 1px 0px;
  background-color: #ff7676;
  color: white;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  margin-right: 30px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 22px;
    background-color: #ff7676;
    border-radius: 50%;
    top: 0;
    left: -10px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 22px;
    background-color: #ff7676;
    border-radius: 50%;
    top: 0;
    right: -10px;
  }
`;
const Cnt3 = styled.span`
  width: 39px;
  height: 22px;
  padding: 0px 0px 1px 0px;
  background-color: #ff7676;
  color: white;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  margin-right: 30px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 22px;
    background-color: #ff7676;
    border-radius: 50%;
    top: 0;
    left: -10px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 15px;
    height: 22px;
    background-color: #ff7676;
    border-radius: 50%;
    top: 0;
    right: -10px;
  }
`;
const Cnt4 = styled.span`
  width: 45px;
  height: 22px;
  padding: 0px 0px 1px 4px;
  background-color: #ff7676;
  color: white;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  margin-right: 30px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 22px;
    background-color: #ff7676;
    border-radius: 50%;
    top: 0;
    left: -10px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 22px;
    background-color: #ff7676;
    border-radius: 50%;
    top: 0;
    right: -10px;
  }
`;
const ChatPreview = styled.div`
  height: 72px;
  max-height: 15%;
  padding: 25px 0px 0px 30px;
  flex: 1;
  display: flex;
  gap: 7px;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  align-content: center;
  jusify-content: center;
  &:hover {
    background-color: #e8ebee;
  }
  &.active {
    background-color: var(--lightestgrey, #f7f8fa);
    &:hover {
      background-color: #e8ebee;
    }
  }
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
