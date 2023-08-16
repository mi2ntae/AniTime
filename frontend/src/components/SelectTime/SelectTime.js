import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { ProgressBar } from "styled/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router";
import { setReservedDate } from "reducer/reservation";
import http from "api/commonHttp";
import Swal from "sweetalert2";

export default function SelectTime() {
  const location = useLocation();
  const { shelterNo, desertionNo } = useParams();
  const generalNo = useSelector((state) => state.member.memberNo);
  const [shelter, setShelter] = useState({});
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [possible, setPossible] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getImpossible();
    setTime("");
  }, [date]);
  useEffect(() => {
    http
      .get(`shelter/${shelterNo}`)
      .then((res) => {
        setShelter(res.data);
      })
      .catch((err) => {});
  }, [shelterNo]);
  function getImpossible() {
    http
      .get(
        `meet/reservation/${shelterNo}?month=${
          date.getMonth() + 1
        }&day=${date.getDate()}`
      )
      .then((res) => setPossible(res.data));
  }
  const times = Array(9)
    .fill()
    .map((_, index) => {
      return 9 + index + ":00";
    }); // "9:00" ~ "17:00"이 담긴 배열 생성

  const submitTime = () => {
    if (time === "") {
      alert("시간을 선택해 주세요.");
      return;
    }
    let tempTime;
    if (time.length === 4) {
      tempTime = "0" + time;
    } else {
      tempTime = time;
    }
    dispatch(
      setReservedDate({
        date:
          "2023-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        time: tempTime,
      })
    );
    navigate(`/desertion/reservation/${shelterNo}/${desertionNo}/form`);
  };
  const reserveTime = () => {
    if (time === "") {
      alert("시간을 선택해 주세요.");
      return;
    }
    Swal.fire({
      position: "center",
      // icon: "success",
      title: "미팅을 예약하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#3994F0",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        const rdate =
          "2023-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        let tempTime;
        if (time.length === 4) {
          tempTime = "0" + time;
        } else {
          tempTime = time;
        }
        const data = new FormData();
        data.append(
          `meetReservation`,
          new Blob([
            JSON.stringify({
              desertionNo: desertionNo,
              generalNo: generalNo,
              reservedDate: rdate + "T" + tempTime,
            }),
          ]),
          {
            type: "application/json",
          }
        );
        http
          .post(`meet/reservation`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.code === 200) {
              Swal.fire({
                position: "center",
                // icon: "success",
                imageUrl: "/icons/img_complete.svg",
                title: "성공적으로 예약되었습니다.",
                showConfirmButton: false,
                timer: 1000,
              }).then((res) => {
                window.location.href = "/";
                // navigate("/");
              });
            }
          })
          .catch(() => {
            Swal.fire({
              position: "center",
              icon: "error",
              // imageUrl: "/icons/img_complete.svg",
              title: "오류가 발생했습니다.",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      } else return;
    });
  };
  function setReservationDate(value) {
    const temp = new Date();
    const year = temp.getFullYear();
    const month = ("0" + (temp.getMonth() + 1)).slice(-2);
    const day = ("0" + temp.getDate()).slice(-2);
    const today = new Date(`${year}-${month}-${day}T00:00:00`);
    if (value < today) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "오늘 이전의 날짜는 선택할 수 없습니다.",
        timer: 1000,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
      });
      return;
    } else {
      setDate(value);
    }
  }
  return (
    <PageContainer>
      {location.state.category === 0 ? (
        <ProgressBar>
          <div>
            <img src={`/icons/Component 24.svg`} />
          </div>
          <div
            style={{
              width: "312px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "#35383B",
                fontWeight: "bold",
              }}
            >
              미팅일자 선택
            </div>
            <div
              style={{
                color: "#7D848A",
              }}
            >
              신청서 작성
            </div>
          </div>
        </ProgressBar>
      ) : (
        <div
          style={{
            marginTop: "39px",
          }}
        ></div>
      )}
      <ShelterContainer>
        <div>{shelter.name}</div>
        <div>
          <img src={`/icons/ic_call.svg`} alt="연락처" />
          {shelter.phone}
        </div>
        <div>
          <img src={`/icons/ic_location.svg`} alt="위치" />
          {shelter.addr}
        </div>
      </ShelterContainer>
      <PickerContainer>
        <Calendar
          value={date}
          onChange={setReservationDate}
          formatDay={(locale, date) => dayjs(date).format("D")}
        ></Calendar>
        <TimePicker>
          <div
            style={{
              justifyContent: "center",
              fontSize: "14px",
              display: "flex",
              width: "280px",
              marginBottom: "20px",
              color: "#7D848A",
            }}
          >
            미팅은 1시간동안 진행됩니다.
          </div>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7D848A",
              marginTop: "5px",
              marginBottom: "5px",
              fontSize: "14px",
              borderRadius: "12px",
              width: "280px",
              height: "50px",
              backgroundColor: "#E8EBEE",
            }}
          >
            1시간 (고정)
          </div> */}
          <div
            style={{
              marginTop: "8px",
              fontSize: "16px",
              display: "flex",
              width: "280px",
            }}
          >
            미팅 시간
          </div>
          <TimeContainer>
            <ScrollableDiv>
              {times.map((v, i) => {
                return (
                  <button
                    key={i}
                    style={
                      !possible[v.split(":")[0]]
                        ? {
                            color: "#7D848A",
                            backgroundColor: "#CACED3",
                            textDecoration: "line-through",
                          }
                        : v === time
                        ? {
                            border: "0.77px solid #3994F0",
                            color: "#3994F0",
                            backgroundColor: "#E1F0FF",
                          }
                        : { color: "#CACED3" }
                    }
                    onClick={() => setTime(v)}
                    disabled={!possible[v.split(":")[0]] ? true : false}
                  >
                    {v}
                  </button>
                );
              })}
            </ScrollableDiv>
          </TimeContainer>

          <div
            style={{
              fontSize: "12px",
              color: "#7D848A",
            }}
          >
            미팅 일자: {date.getMonth() + 1}월 {date.getDate()}일 {time}
          </div>
          {location.state.category === 0 ? (
            <button id="nextButton" onClick={submitTime}>
              다음
            </button>
          ) : (
            <button id="nextButton" onClick={reserveTime}>
              미팅 예약하기
            </button>
          )}
        </TimePicker>
      </PickerContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ShelterContainer = styled.div`
  margin-bottom: 50px;
  div {
    &:first-child {
      font-weight: bold;
      color: #35383b;
      font-size: 24px;
    }
    &:nth-child(2) {
      color: #535a61;
      font-size: 14px;
    }
    &:last-child {
      color: #535a61;
      font-size: 16px;
    }
  }
`;
const PickerContainer = styled.div`
  width: 880px;
  height: 660px;
  display: flex;
  //   네비게이션바

  .react-calendar {
    padding-top: 94px;
    color: #ffffff;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 530px;
    background-color: #535a61;
    .react-calendar__navigation button {
      color: #ffffff;
      min-width: 44px;
      background: none;
      font-size: 16px;
      margin-top: 8px;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: transparent;
    }
    .react-calendar__navigation__label > span {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
    }
    //타일

    .react-calendar__tile {
      //   width: 51px;
      //   height: 51px;
      //   margin: 10px;
      width: 71px;
      height: 71px;
      color: #ffffff;
      font-size: 16px;
      background: transparent;
      text-align: center;
    }
    // .react-calendar__tile:enabled:focus,
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile--active {
      background-color: #ffffff;
      border-radius: 40px;
      color: #535a61;
    }
    .react-calendar__tile--now {
      background: transparent;
      color: #ffffff;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
      background-color: #ffffff;
      border-radius: 40px;
      color: #535a61;
    }
  }
`;

const TimePicker = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  border: 1px solid #e8ebee;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  width: 350px;
  align-items: center;
  flex-direction: column;
  button {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    border-radius: 12px;
    width: 280px;
    height: 50px;
    border: 0.77px solid #e8ebee;
    background-color: transparent;
  }
  #nextButton {
    color: #ffffff;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    border-radius: 12px;
    width: 280px;
    height: 50px;
    background-color: #3994f0;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ScrollableDiv = styled.div`
  width: min-content;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a7aeb4;
    border-radius: 4px;
  }
`;
