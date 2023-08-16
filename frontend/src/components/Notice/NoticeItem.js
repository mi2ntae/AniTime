import React from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

export default function NoticeItem({
  noticeKind,
  noticeTime,
  noticeContent,
  close,
}) {
  const kindIcon = [
    "/icons/notification/ic_animal.svg",
    "/icons/notification/ic_time.svg",
    "/icons/notification/ic_pay.svg",
    "/icons/notification/ic_chat.svg",
  ];

  const navigate = useNavigate();

  return (
    <ItemDiv
      onClick={() => {
        if (noticeKind === 1) {
          navigate("/mypage");
          close();
        }
      }}
    >
      <KindImg src={kindIcon[noticeKind]} />
      <ContentDiv>
        {noticeContent.split("\\n").map((item, index) => (
          <span key={index}>{item}</span>
        ))}
        <span style={{ color: "#7D848A", fontSize: "12px" }}>{noticeTime}</span>
      </ContentDiv>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const KindImg = styled.img`
  margin: 8px;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  font-size: 0.85rem;
`;
