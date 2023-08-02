import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button } from "styled/styled";

export default function MyPageMeeting() {
  const [meetings, setMeetings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    // api 통신
    const testData = [
      {
        meetNo: 12345,
        member: {
          name: "김민태",
        },
        reservedDate: "2023-07-24 15:00",
        status: "종료",
      },
      {
        meetNo: 12347,
        member: {
          name: "김민태",
        },
        reservedDate: "2023-07-24 15:00",
        status: "종료",
      },
    ];
    console.log("pageNo: " + pageNo);
    setMeetings(testData);
    setMaxPage(5);
  }, [pageNo]);

  return (
    <MainDiv>
      <TableContainer>
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
                <TableCell>{item.member.name}</TableCell>
                <TableCell>{item.reservedDate}</TableCell>
                <TableCell>{item.reservedDate}</TableCell>
                <TableCell>{item.reservedDate}</TableCell>
                <TableCell>
                  <Button onClick={() => console.log(item.meetNo)}>
                    {item.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={maxPage}
        page={pageNo}
        onChange={(event, value) => setPageNo(value)}
      />
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
