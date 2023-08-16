import Logo from "components/Header/Logo";
import React from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import http from "api/commonHttp";
import { setRoom } from "reducer/chatRoom";

export default function MeetingHeader({ tabOpen, handleTabOpen, meetingNo }) {
  const dispatch = useDispatch();
  const memberName = useSelector((state) => state.member.name);
  return (
    <Header>
      <Div>
        <Logo white={true} />
      </Div>
      <Div>
        <Span
          $active={tabOpen.formTab}
          onClick={() => handleTabOpen((p) => ({ ...p, formTab: !p.formTab }))}
        >
          상담 신청서
        </Span>
        |
        <Span
          $active={tabOpen.profileTab}
          onClick={() =>
            handleTabOpen((p) => ({ ...p, profileTab: !p.profileTab }))
          }
        >
          동물 프로필
        </Span>
        |
        <Span
          $active={tabOpen.chatTab}
          onClick={() => {
            http
              .get(`chat/room/meet/${meetingNo}`)
              .then((res) => {
                console.log(res);
                if(res.data.generalName === memberName) dispatch(setRoom({ roomNo: res.data.roomNo, name: res.data.shelterName }));
                else dispatch(setRoom({ roomNo: res.data.roomNo, name: res.data.generalName }));
                handleTabOpen((p) => ({ ...p, chatTab: !p.chatTab }));
              })
              .catch((err) => {
                // console.log(err);
              });
          }}
        >
          채팅 열기
        </Span>
      </Div>
    </Header>
  );
}

const Header = styled.div`
  background-color: #2e2f39;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: white;
`;

const Div = styled.div`
  display: flex;
  gap: 16px;
`;

const Span = styled.span`
  font-weight: bold;
  cursor: pointer;
  ${({ $active }) => $active && "opacity:0.5"}
`;
