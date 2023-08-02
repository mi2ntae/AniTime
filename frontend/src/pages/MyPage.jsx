import React, { useState } from "react";
import { styled } from "styled-components";
import { MainContainer, Button } from "styled/styled";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import MyPageMeeting from "components/MyPage/MyPageMeeting";
import MyPageChatting from "components/MyPage/MyPageChatting";
import MyPageWatchlist from "components/MyPage/MyPageWatchlist";
import ShelterMeeting from "components/MyPage/ShelterMeeting";
import ShelterDonation from "components/MyPage/ShelterDonation";

export default function MyPage() {
  const member = useSelector((state) => state.member);
  const [tabNo, setTabNo] = useState(0);

  const tabs = [
    // 일반회원: memberKind == 0
    [
      { title: "미팅내역", content: <MyPageMeeting /> },
      { title: "채팅내역", content: <MyPageChatting /> },
      { title: "즐겨찾기", content: <MyPageWatchlist /> },
    ],
    // 보호소회원: memberKind == 1
    [
      { title: "미팅신청현황", content: <ShelterMeeting /> },
      { title: "채팅", content: <MyPageChatting /> },
      { title: "후원현황", content: <ShelterDonation /> },
    ],
  ];

  return (
    <MainContainer $vertical>
      <MyPageHeader>
        <MemberNameDiv>
          <MemberName>{member.name}</MemberName>
          <MemberType>{member.memberKind === 1 ? "보호소회원" : ""}</MemberType>
        </MemberNameDiv>
        <Button $border="#E8EBEE 1px solid">정보수정하기</Button>
      </MyPageHeader>
      <Tabs value={tabNo} onChange={(event, newVal) => setTabNo(newVal)}>
        {tabs[member.memberKind].map((item, index) => {
          return <Tab key={index} value={index} label={item.title} />;
        })}
      </Tabs>
      <TabPanel>
        {tabs[member.memberKind].map((item, index) => (
          <div hidden={index !== tabNo} key={index} style={{ width: "100%" }}>
            {item.content}
          </div>
        ))}
      </TabPanel>
    </MainContainer>
  );
}

const MyPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`;
const MemberNameDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;
const MemberName = styled.span`
  font-size: 2.5rem;
  float: left;
`;
const MemberType = styled.span`
  margin-left: 8px;
`;
const TabPanel = styled.div`
  border-top: #d7d7d7 1px solid;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;
