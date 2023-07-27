import { styled } from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

export default function SelectTime(){
    const [date,setDate]=useState(new Date())
    const [time,setTime]=useState("")
    const times = Array(10)
    .fill()
    .map((_, index) => {
      return 9 + index + ":00";
    }); // "9:00" ~ "18:00"이 담긴 배열 생성
    const shelter={
        name:"싸피 보호소",
        phone:"010-0000-0000",
        addr:"서울시 강남구 테헤란로 123-45"
    }
    return(<>
        {<div>{date.getDate()}</div>}
        <ShelterContainer>
            <div>{shelter.name}</div>
            <div>{shelter.phone}</div>
            <div>{shelter.addr}</div>
        </ShelterContainer>
        <MainContainer>
            <Calendar
                value={date}
                onChange={setDate}
                style={{

                }}
            ></Calendar>
            <TimePicker>
                {time}
                { times.map((v) => {
        return <button
        style={v==time?{
            color:"blue",
            backgroundColor:"skyblue",
        }:{color:"grey"}}
        onClick={()=>setTime(v)}
    >
        {v}
        </button>})}
            </TimePicker>
        </MainContainer>
    </>);
}
const ShelterContainer=styled.div`

`
const MainContainer=styled.div`
    .react-calendar{
        border:1px solid red;
    }
`

const TimePicker=styled.div`
display:flex;
flex-direction:column;
    button{
        font-size:14px;
        border-radius:12px;
        width:280px;
        height:50px;
        border:1px solid blue;
        background-color:transparent;
    }
`