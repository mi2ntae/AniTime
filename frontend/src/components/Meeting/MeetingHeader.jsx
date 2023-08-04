import React from "react";
import { styled } from "styled-components";

export default function MeetingHeader({ tabOpen, handleTabOpen }) {
  return (
    <Header>
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
        onClick={() => handleTabOpen((p) => ({ ...p, chatTab: !p.chatTab }))}
      >
        채팅 열기
      </Span>
    </Header>
  );
}

const Header = styled.div`
  background-color: #2e2f39;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  color: white;
`;

const Span = styled.span`
  font-weight: bold;
  cursor: pointer;
  ${({ $active }) => $active && "opacity:0.5"}
`;
