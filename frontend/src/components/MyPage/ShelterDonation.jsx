import { Pagination } from "@mui/material";
import http from "api/commonHttp";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function ShelterDonation({ setBoardNo, setShowDonationDetail }) {
  const [currentPage, setCurrentPage] = useState(1);
  const shelterNo = useSelector((state) => state.member.memberNo);
  const [contents, setContents] = useState([]);
  const [totalPage, setTotalPage] = useState("");

  const statusColor = ["#F7F8FA", "#E1F0FF", "#D9F7DC", "#FBEEEE"];
  const statusBorderColor = ["#A7AEB4", "#3994F0", "#52A95B", "#FF7676"];
  const statusMessage = ["후원대기", "후원중", "후원성공", "후원실패"];

  const navigate = useNavigate();

  const handleWriteBtnClick = () => {
    navigate("/donation/write");
  };

  useEffect(() => {
    http
      .get(`donation/shelter/${shelterNo}`, {
        params: {
          pageNo: currentPage - 1,
        },
      })
      .then((data) => {
        setContents(data.data.content);
        setTotalPage(data.data.totalPages);
        console.log(contents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const handlePageChange = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setCurrentPage(nowPageInt);
  };
  return (
    <div
      style={{
        display: "flex",
        alignContent: "space-between",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        gap: "32px",
      }}
    >
      <TabHeader>
        <TabTitle>후원 현황</TabTitle>
        <Button
          $background_color="#3994F0"
          color="#FFFFFF"
          style={{
            padding: "10px 16px",
            fontSize: "14px",
            fontWeight: 700,
            borderRadius: "12px",
          }}
          onClick={handleWriteBtnClick}
        >
          {/* <Typography variant="body1" fontSize={14} fontWeight="700">
            후원공고 등록하기
          </Typography> */}
          후원공고 등록하기
        </Button>
      </TabHeader>
      <Table>
        <TableHeader>
          <ContentTitle style={{ justifyContent: "center" }}>제목</ContentTitle>
          <ContentDuration>공고기간</ContentDuration>
          <ContentAttained>후원금액 / 목표금액</ContentAttained>
        </TableHeader>
        {contents.map((content, index) => (
          <TableContent
            key={index}
            onClick={() => {
              setBoardNo(index);
              setShowDonationDetail(true);
            }}
          >
            <ContentTitle>
              <div
                style={{
                  backgroundColor: statusColor[content.status],
                  border: "1px solid " + statusBorderColor[content.status],
                  color: statusBorderColor[content.status],
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "400",
                  width: "64px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
              >
                {statusMessage[content.status]}
              </div>
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap", //텍스트 줄 바꿈 방지
                  textOverflow: "ellipsis", // 말줄임(...)
                  overflow: "hidden",
                  color: "var(--blackgrey, #35383b)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {content.title}
              </div>
            </ContentTitle>
            <ContentDuration
              style={{
                color: "var(--darkestgrey, #535a61)",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              {content.date}
            </ContentDuration>
            <ContentAttained>
              <span
                style={{
                  color: "var(--blackgrey, #35383B)",
                  fontSize: "16px",
                }}
              >
                {content.attained}
              </span>
              <span
                style={{
                  color: "var(--darkgrey, #7d848a)",
                  fontSize: "14px",
                }}
              >
                / {content.goal}
              </span>
            </ContentAttained>
          </TableContent>
        ))}
      </Table>
      <div style={{ flex: "1" }} />
      <Pagination
        count={totalPage}
        page={currentPage}
        onChange={handlePageChange}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        defaultPage={1}
      />
    </div>
  );
}

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;
const TabTitle = styled.span`
  font-size: 1.5rem;
  margin: 0 32px;
  color: var(--blackgrey, #35383b);
  // font-size: 20px;
  font-weight: 700;
`;
const Table = styled.div`
  // background-color: var(--lightestgrey, #f7f8fa);
  border: 1px solid var(--lightgrey, #e8ebee);
  border-radius: 8px;
  flex: 1;
`;
const TableHeader = styled.div`
  background-color: var(--lightestgrey, #f7f8fa);
  color: var(--darkgrey, #7d848a);
  font-size: 16px;
  font-weight: 700;
  display: flex;
  width: 100%;
  flex-direction: row;
  text-align: center;
  height: 64px;
  align-items: center;
  gap: 24px;
`;
const TableContent = styled.div`
  border-top: 1px solid var(--lightgrey, #e8ebee);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 64px;
  align-items: center;
  gap: 24px;
  font-weight: 400;
`;
const ContentTitle = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  gap: 24px;
  overflow: hidden;
`;
const ContentDuration = styled.div`
  flex: 1;
  // background-color: green;
  text-align: center;
`;
const ContentAttained = styled.div`
  flex: 1;
  // background-color: blue;
  text-align: center;
`;
