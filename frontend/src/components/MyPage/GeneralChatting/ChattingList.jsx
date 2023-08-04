import { Box } from "@mui/material";
  import React, { useEffect, useState } from "react";
//   import { useDispatch } from "react-redux";
  import {css, styled} from "styled-components";
//   import { setMeetingNo } from "reducer/shelterMeeting";
//   import { Button } from "styled/styled";
  
  export default function ChattingList() {
    const [chatList, setChatList] = useState([]);

    // const dispatch = useDispatch();
  
    useEffect(() => {
      // api 통신
      const chattingListData = [
        {
          roomNo: 111,
          shelterMember: {
            name: "태민 보호소",
          },
          lastDate: "어제",
          lastMsg: "메시지가 도착했습니다.",
          unreadCnt: 1,
        },
        {
          roomNo: 112,
          shelterMember: {
            name: "소호보호소",
          },
          lastDate: "오전 11:30",
          lastMsg: "메시지가 도착했습니다.",
          unreadCnt: 30,
        },
        {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 300,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 300,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 0,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          },
          {
            roomNo: 112,
            shelterMember: {
              name: "소호보호소",
            },
            lastDate: "오전 11:30",
            lastMsg: "메시지가 도착했습니다.",
            unreadCnt: 30,
          }
      ];
      setChatList(chattingListData );
    }, []);
  
    return (
      <>
        <Box sx={{width:"50%", height: "600px",  display: "flex",  flexDirection: "column",border: "1px solid #ccc"}}>
        <Box sx={{height: "85px", width: "100%",borderBottom: "1px solid #ccc"}}>
            <Text>
            <Font1>메시지</Font1>
            </Text>
            </Box>
            <Box2>
              {chatList.map((item) => (
                <Box 
                  sx={{padding:"15px"}} 
                  key={item.roomNo}
                >
                     {/* onClick={() => dispatch(setChatList(item.roomNo))} */}
                  <Div>
                  <ShelterName>{item.shelterMember.name}</ShelterName><LastDate>{item.lastDate}</LastDate>
                  </Div>
                  <Div>
                  <LastMsg>{item.lastMsg}</LastMsg>{item.unreadCnt!==0 ?<Cnt unreadCnt={item.unreadCnt}>{item.unreadCnt}</Cnt>: null}
                  </Div>
                </Box>
              ))}
            </Box2>
        </Box>
      </>
    );
  }

  const ShelterName = styled.span`
    font-size: 18px;
    font-weight: bold;
  `

  const Font1 = styled.span`
     font-size: 25px;
  `;
  const Text = styled.div`
  padding: 12px 15px 12px 25px;
  `;
  const LastMsg = styled.span`
  font-size: 15px;
  `;
  const LastDate =styled.span`
    font-size: 15px;
  `
  const Cnt = styled.span`
  variant: outlined;
  width: 22px;
  height: 22px;
  background-color: #FF7676;
  color: white;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${({ unreadCnt }) =>
    unreadCnt >= 100 ? "30%" : unreadCnt > 0 ? "50%" : "null"};
`;
  const Box2 = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 20px;
   ${css`
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const Div = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
`;

