import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import http from "api/commonHttp";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMeetingNo } from "reducer/shelterMeeting";
import { css, styled } from "styled-components";
import { processState } from "./processState";

export default function MeetingList() {
  const member = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const [meetings, setMeetings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    // api 통신
    http
      .get(`meet/${member.memberNo}?page=${pageNo - 1}`)
      .then(({ data: { content, totalPages } }) => {
        setMeetings(content);
        setMaxPage(totalPages);
      })
      .catch(() => {
        console.log("미팅 목록 조회 실패");
      });
  }, [pageNo, member.memberNo]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>미팅내용</TableCell>
              <TableCell>일시</TableCell>
              <TableCell>미팅상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((item) => (
              <TableRow
                key={item.meetNo}
                onClick={() => dispatch(setMeetingNo(item.meetNo))}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.meetContent}</TableCell>
                <TableCell>{item.reservedDate}</TableCell>
                <TableCell>{processState(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {maxPage == 0 && <Text>미팅 내역이 없습니다</Text>}
      </TableContainer>
      {maxPage != 0 && (
        <Pagination
          count={maxPage}
          page={pageNo}
          onChange={(event, value) => setPageNo(value)}
        />
      )}
    </>
  );
}

const Text = styled.div`
  text-align: center;
  padding-top: 16px;
`;
