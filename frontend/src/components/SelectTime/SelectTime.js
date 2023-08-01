import { styled } from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { ProgressBar } from "styled/styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function SelectTime() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [impossible, setImpossible] = useState([]);
  function getImpossible() {
    // 이미 예약된 시간의 배열 가져옴
  }
  const times = Array(10)
    .fill()
    .map((_, index) => {
      return 9 + index + ":00";
    }); // "9:00" ~ "18:00"이 담긴 배열 생성
  const shelter = {
    name: "싸피 보호소",
    phone: "010-0000-0000",
    addr: "서울시 강남구 테헤란로 123-45",
  };
  const submitTime = () => {
    if (time === "") {
      alert("시간을 선택해 주세요.");
      return;
    }
    dispatch({ type: "SUBMIT_TIME", time: time, date: date });
    navigate("/desertion/reservation/form");
  };
  return (
    <PageContainer>
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
          onChange={setDate}
          formatDay={(locale, date) => dayjs(date).format("D")}
        ></Calendar>
        <TimePicker>
          <div
            style={{
              fontSize: "16px",
              display: "flex",
              width: "280px",
            }}
          >
            미팅 기간
          </div>
          <div
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
            1시간
          </div>
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
          {times.map((v) => {
            return (
              <button
                style={
                  v === time
                    ? {
                        border: "0.77px solid #3994F0",
                        color: "#3994F0",
                        backgroundColor: "#E1F0FF",
                      }
                    : { color: "#CACED3" }
                }
                onClick={() => setTime(v)}
              >
                {v}
              </button>
            );
          })}
          <div
            style={{
              fontSize: "12px",
              color: "#7D848A",
            }}
          >
            미팅 일자: {date.getMonth() + 1}월 {date.getDate()}일 {time}
          </div>
          <button id="nextButton" onClick={submitTime}>
            다음
          </button>
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
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
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
      color: #ffffff;
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
