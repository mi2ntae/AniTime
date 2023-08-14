import {
  Pagination,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
} from "@mui/material";
import http from "api/commonHttp";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function MyPageMeeting() {
  const navigate = useNavigate();

  const member = useSelector((state) => state.member);

  const [meetings, setMeetings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const enterMeeting = (meetingNo) => {
    // console.log("enter: " + meetingNo);
    navigate(`/meeting/${meetingNo}`);
  };

  const processState = (item) => {
    let res = undefined;
    switch (item.state) {
      case 0:
        res = <StateText color="#535A61">승인대기</StateText>;
        break;
      case 1:
        const rDate = new Date(item.reservedDate);
        const nDate = new Date();
        const diff = rDate.getTime() - nDate.getTime();
        // 30분
        if (diff < -1800000) {
          res = <StateText color="#535A61">종료</StateText>;
        } else if (diff < 1800000) {
          res = (
            <Button
              $background_color="#3994F0"
              color="#FFFFFF"
              style={{ fontWeight: "bold" }}
              onClick={() => enterMeeting(item.meetNo)}
            >
              미팅 참여
            </Button>
          );
        } else res = <StateText color="#3994F0">승인</StateText>;
        break;
      case 2:
        res = <StateText color="#FF7676">반려</StateText>;
    }
    return res;
  };

  useEffect(() => {
    // api 통신
    http
      .get(`meet/${member.memberNo}/?page=${pageNo - 1}`)
      .then(({ data: { content, totalPages } }) => {
        setMeetings(content);
        setMaxPage(totalPages);
      })
      .catch(() => {
        // console.log("미팅 목록 조회 실패");
      });
  }, [pageNo, member.memberNo]);

  return (
    <MainDiv>
      {meetings.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#A7AEB4",
            fontSize: "14px",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <img src="/logo_grey.svg" />
          미팅 정보가 없습니다.
        </div>
      ) : (
        <>
          <div
            style={{
              borderRadius: "8px",
              border: "1px solid #e8ebee",
              width: "100%",
              marginTop: "48px",
            }}
          >
            <Table>
              <TableHead>
                <TableCell>보호소명</TableCell>
                <TableCell>미팅내용</TableCell>
                <TableCell>공고번호</TableCell>
                <TableCell>일시</TableCell>
                <TableCell>미팅상태</TableCell>
              </TableHead>
              {meetings.map((item) => (
                <Content key={item.meetNo}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.meetContent}</TableCell>
                  <TableCell>{item.desertionNo}</TableCell>
                  <TableCell>{item.reservedDate}</TableCell>
                  <TableCell>{processState(item)}</TableCell>
                </Content>
              ))}
            </Table>
          </div>
          <Pagination
            count={maxPage}
            page={pageNo}
            onChange={(event, value) => setPageNo(value)}
            style={{ marginBottom: "64px" }}
          />
        </>
      )}
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>보호소명</TableCell>
              <TableCell>미팅내용</TableCell>
              <TableCell>공고번호</TableCell>
              <TableCell>일시</TableCell>
              <TableCell>미팅상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((item) => (
              <TableRow key={item.meetNo}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.meetContent}</TableCell>
                <TableCell>{item.desertionNo}</TableCell>
                <TableCell>{item.reservedDate}</TableCell>
                <TableCell>{processState(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       */}
    </MainDiv>
  );
}

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const StateText = styled.span`
  font-weight: bold;
  color: ${({ color }) => color || "black"};
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse; // 변경된 부분
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--lightgrey, #e8ebee);
`;

const TableHead = styled.tr`
  background-color: var(--lightestgrey, #f7f8fa);
  height: 64px;
  color: var(--darkgrey, #7d848a);
  font-size: 16px;
  font-weight: 700;
`;

const Content = styled.tr`
  & td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  & td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  border-bottom: 1px solid var(--lightgrey, #e8ebee);
  height: 64px;
  color: var(--darkestgrey, #535a61);
  font-size: 14px;
  font-weight: 400;
`;

const TableCell = styled.td`
  padding: 10px;
  border: none;
  text-align: center;
  border-top: 1px solid var(--lightgrey, #e8ebee);
`;
