import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import NoticeItem from "./NoticeItem";
import http from "api/commonHttp";
import { useSelector } from "react-redux";

export default function NoticeContainer() {
  const [noticeList, setNoticeList] = useState([]);
  const member = useSelector((state) => state.member);

  const getNotice = useCallback(() => {
    http
      .get(`notice?memberNo=${member.memberNo}`)
      .then(({ data }) => {
        setNoticeList(data);
        data.forEach((element) => {
          http
            .put(`notice/${element.noticeNo}`)
            .catch((error) => console.error(error));
        });
      })
      .catch((error) => console.error(error));
  }, [member]);

  const deleteNotice = useCallback(() => {
    setNoticeList([]);
    http
      .delete(`notice/${member.memberNo}`)
      .catch((error) => console.error(error));
  }, [member]);

  useEffect(() => {
    getNotice();
  }, [getNotice]);

  return (
    <Container>
      <Body>
        {noticeList.length === 0
          ? "알림이 없습니다"
          : noticeList.map((item) => (
              <NoticeItem {...item} key={item.noticeNo} />
            ))}
      </Body>
      <Footer onClick={deleteNotice}>알림함 비우기</Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 360px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: auto;
  height: calc(100% - 50px);
  box-sizing: border-box;
  padding: 16px;
  text-align: center;
  row-gap: 16px;
  font-size: 0.85rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  border-top: #e8ebee 1px solid;
  cursor: pointer;
  color: #7d848a;
  font-size: 0.85rem;
`;
