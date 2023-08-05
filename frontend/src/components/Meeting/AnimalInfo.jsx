import styled from "styled-components";
import { useState, useEffect } from "react";
import http from "api/commonHttp";
export default function AnimalInfo() {
  const desertionNo = 447510202300017;
  const items = [
    "종류",
    "추정 나이",
    "몸무게",
    "털색",
    "성별",
    "공고번호",
    "공고기간",
    "발견장소",
    "특이사항",
    "보호소",
    "연락처",
  ];
  const index = [
    "kind",
    "birth",
    "weight",
    "color",
    "gender",
    "noticeNo",
    "noticeDate",
    "location",
    "specialMark",
    "shelter",
    "tel",
  ];
  const [info, setInfo] = useState({});
  useEffect(() => {
    http
      .get(`desertion/${desertionNo}`)
      .then((res) => {
        setInfo(res.data);
      })
      .catch(() => {
        console.log("유기동물 세부정보 조회 실패");
      });
  }, []);
  return (
    <RootContainer>
      <Top>
        <div>동물 프로필</div>
        <button>X</button>
      </Top>
      <ImageContainer
        style={{
          backgroundImage: info.thumbnail,
        }}
      >
        {/* <img src={info.thumbnail} alt="썸네일 이미지"></img> */}
      </ImageContainer>
      <InfoContainer>
        <Content>
          <div>대상 동물 정보</div>
          {items
            .filter((v, i) => i < 5)
            .map((v, i) => (
              <ItemContainer key={i}>
                <div>{v}</div>
                <div>{info[index[i]]}</div>
              </ItemContainer>
            ))}
        </Content>
        <Content>
          <div>공고 정보</div>
          {items
            .filter((v, i) => i >= 5)
            .map((v, i) => (
              <ItemContainer key={i}>
                <div>{v}</div>
                <div>{info[index[i]]}</div>
              </ItemContainer>
            ))}
        </Content>
      </InfoContainer>
    </RootContainer>
  );
}
const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 432px;
  height: 860px;
`;

const Top = styled.div`
  padding: 0 36px;
  background-color: #f7f8fa;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7d848a;
  font-size: 16px;
  font-weight: bold;
  div {
    margin-right: 250px;
  }
  button {
    border: none;
    background-color: transparent;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 360px;
  height: 530px;
  border: 1px solid #e8ebee;
  border-radius: 0 0 8px 8px;
`;

const ImageContainer = styled.div`
  width: 360px;
  height: 186px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
`;
const Content = styled.div`
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > div:first-child {
    margin-bottom: 12px;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
  }
`;
const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
  font-size: 14px;
  div:first-child {
    color: #a7aeb4;
    width: 70px;
    text-align: left;
  }
`;
