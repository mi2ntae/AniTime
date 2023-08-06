import { Pagination } from "@mui/material";
import http from "api/commonHttp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function ShelterDonationDetail({ boardNo }) {
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`donation/shelter/board/${boardNo}`, {
        params: {
          pageNo: currentPage - 1,
        },
      })
      .then((data) => {
        setContents(data.data.content);
        setTotalPage(data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const handlePageChange = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setCurrentPage(nowPageInt);
  };

  const handleWriteBtnClick = () => {
    navigate("/donation/write");
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
          후원공고 등록하기
        </Button>
        {/* <Button>후원공고 등록하기</Button> */}
      </TabHeader>
      <Table>
        <TableHeader>
          <ContentDates style={{ justifyContent: "center" }}>
            후원일자
          </ContentDates>
          <ContentName>후원자명</ContentName>
          <ContentAttained>후원금액</ContentAttained>
        </TableHeader>
        {contents.map((content, index) => (
          <TableContent key={index}>
            <ContentDates>
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap", //텍스트 줄 바꿈 방지
                  textOverflow: "ellipsis", // 말줄임(...)
                  overflow: "hidden",
                  fontSize: "14px",
                }}
              >
                {content.donationDate}
              </div>
            </ContentDates>
            <ContentName>{content.memberName}</ContentName>
            <ContentAttained>{content.money}</ContentAttained>
          </TableContent>
        ))}
      </Table>
      <div style={{ flex: "1" }} />
      <Pagination
        count={totalPage}
        page={currentPage}
        onChange={handlePageChange}
        style={{ display: "flex", justifyContent: "center" }}
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
  color: var(--blackgrey, #35383b);
  font-size: 16px;
`;
const ContentDates = styled.div`
  flex: 1;
  overflow: hidden;
  text-align: center;
  justify-content: center;
  display: flex;
`;
const ContentName = styled.div`
  flex: 1;
  //   background-color: green;
  text-align: center;
`;
const ContentAttained = styled.div`
  flex: 1;
  text-align: center;
`;
