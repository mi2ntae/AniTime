import styled,{keyframes} from "styled-components";
import { useEffect, useState } from "react";
export default function FAQ() {
  const faq = [
    { question: "입양 신청자 쪽 카메라를 켜야 하는 이유가 있나요?", answer: "저희는 동물을 보호할 수 있는 환경을 갖춘 보호자를 찾고 있습니다. 따라서, 입양 신청자의 자택 환경 확인을 위해 화면 상으로 확인하는 과정이 요구됩니다." },
    { question: "보호중인 동물과 공고중인 동물의 차이가 무엇인가요?", answer: "동물을 구조하면 일정 기간 동안 원래 주인이 동물을 찾을 수 있도록 보호합니다. 그 후 기간이 지나면 유기동물로 간주하여 동물의 소유권이 관할 지방자치단체로 이전되고, 입양 신청자가 절차를 통해 입양할 수 있게 공고를 합니다." },
    { question: "애니타임을 통해 어떤 동물들을 입양 신청할 수 있나요?", answer: "애니타임에서는 유기견과 유기묘의 정보를 공공 api를 통해 업데이트하고 있습니다. 강아지와 고양이 외의 동물들의 정보는 올리고 있지 않습니다." },
    {question:"입양 후 사정이 생겨서 파양해야 하는 경우에는 어떻게 해야 하나요?",answer:"입양 후 파양은 절대 불가합니다. 신중히 결정해주시기 바랍니다."},
    {question:"실종 동물을 등록하면 어떠한 기준으로 동물이 추천되나요?",answer:"실종 동물의 종류와 색을 고려하고, 실종 동물을 잃어버린 장소를 중심으로 예상 이동 반경을 계산하여 가장 유사한 정보를 가지고 있는 보호중/공고중 동물들을 추천합니다."}
  ];
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    const initial = Array(faq.length).fill(false);
    setVisible(initial);
  }, []);
  function toggle(index){
    console.log(index)
    let copy = [...visible];
    copy[index] = !copy[index];
    setVisible(copy);
    console.log(copy)
    return;
  };
  return (
    <PageContainer>
      <div class="title"><div>자주 묻는 질문</div></div>
      {faq.map((v, i) => (<ItemContainer>
          <QuestionContainer key={i}>
            <div>{i+1}&nbsp;&nbsp;{v.question}</div>
            <button onClick={()=>toggle(i)}>
              {visible[i]?<img src={`/icons/arrow_up.svg`} alt="토글 버튼" />:<img src={`/icons/arrow_bottom.svg`} alt="토글 버튼" />}
              
            </button>
          </QuestionContainer>
          <AnswerContainer
            style={visible[i] ? { display: "block" } : { display: "none" }}
            key={i}
          >
            {v.answer}
          </AnswerContainer>
        </ItemContainer>)
        
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    width:1000px;
    font-size:32px;
    text-align:left;
    margin:40px 0;
  }
`;
const ItemContainer = styled.div`
font-size:14px;
border-top:1px solid #E8EBEE;
  margin:0px;
  width:1120px;
  display: flex;
  flex-direction:column;
`;
const QuestionContainer = styled.div`
  padding:0 24px;
  height:72px;
  div:first-child{
    width:1000px;
    text-align:left;
  }
  display:flex;
  align-items:center;
  button{
    border:none;
    background-color:transparent;
  }
`;

const fadeIn = keyframes`
from {
  opacity:0.7;
  transform: translateY(-5px);
}
to {
  opacity:1;
  transform: translateY(0);
}0.1s forwards;
`;
const AnswerContainer = styled.div`
  width:1072px;
  padding:24px;
  min-height:116px;
  background-color:#F7F8FA;
  animation: ${fadeIn} 0.5s ease-in-out;
`;


