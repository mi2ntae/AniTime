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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMeetingNo, setReload } from "reducer/shelterMeeting";
import { styled } from "styled-components";
import { processState } from "./processState";

export default function MeetingList() {
  const member = useSelector((state) => state.member);
  const reload = useSelector((state) => state.shelterMeeting.reload);
  const dispatch = useDispatch();

  const mounted = useRef(false);

  const [meetings, setMeetings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const meetingNo = useSelector((state) => state.shelterMeeting.meetingNo);

  /**
   * api 통신
   */
  const fetchData = useCallback(() => {
    http
      .get(`meet/${member.memberNo}?page=${pageNo - 1}`)
      .then(({ data: { content, totalPages } }) => {
        setMeetings((prevMeetings) => [...prevMeetings, ...content]); // 기존 데이터에 새 데이터를 추가
        setMaxPage(totalPages);
        if (!mounted.current) {
          mounted.current = true;
        }
      })
      .catch(() => {
        console.console.error("미팅 목록 조회 실패");
      });
  }, [member.memberNo, pageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (mounted.current && reload) {
      fetchData();
      dispatch(setReload(false));
    }
  }, [reload, fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 페이지 하단에 가까운지 확인
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        // 아직 모든 페이지를 불러오지 않았다면
        if (pageNo < maxPage) {
          setPageNo((prev) => prev + 1);
        }
      }
    };

    // 스크롤 이벤트 리스너를 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트 unmount 시 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNo, maxPage]);

  return (
    <>
      <Table style={{ height: "64px" }}>
        <TableHead>
          <TableCell>이름</TableCell>
          <TableCell>미팅내용</TableCell>
          <TableCell>일시</TableCell>
          <TableCell>미팅상태</TableCell>
        </TableHead>
      </Table>
      <div
        style={{
          maxHeight: `calc(100vh - 294px)`,
          overflow: "auto",
          boxSizing: "border-box",
          minWidth: "100%",
        }}
      >
        <Table
          style={{
            maxHeight: `calc(100vh - 295px)`,
            overflow: "auto",
            boxSizing: "border-box",
            minWidth: "100%",
          }}
        >
          {meetings.map((item) => (
            <Content
              key={item.meetNo}
              onClick={() => dispatch(setMeetingNo(item.meetNo))}
              style={
                item.meetNo === meetingNo
                  ? { backgroundColor: "#F7F8FA" }
                  : item.state === 0
                  ? { backgroundColor: "#FFFAFA" }
                  : null
              }
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.meetContent}</TableCell>
              <TableCell>{item.reservedDate}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    weight: "100%",
                  }}
                >
                  {processState(item)}
                </div>
              </TableCell>
            </Content>
          ))}
        </Table>
      </div>
      {maxPage == 0 && <Text>미팅 내역이 없습니다</Text>}
    </>
  );
}

const Text = styled.div`
  text-align: center;
  padding-top: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  height: 100%;
`;

const TableHead = styled.tr`
  background-color: var(--lightestgrey, #f7f8fa);
  height: 64px;
  color: var(--darkgrey, #7d848a);
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid var(--lightgrey, #e8ebee);
`;

const Content = styled.tr`
  height: 64px;
  width: 100%;
  color: var(--darkestgrey, #535a61);
  font-size: 14px;
  font-weight: 400;
`;

const TableCell = styled.td`
  padding: 10px;
  border: none;
  text-align: center;
  border-top: 1px solid var(--lightgrey, #e8ebee);
  width: 25%;
`;
