import styled from "styled-components";
import { useEffect, useState } from "react";
export default function FAQ() {
  const faq = [
    { question: "길라임씨는 언제부터 그렇게 예뻤나?", answer: "태어날 때부터" },
    { question: "증거 있어?", answer: "엄청나지" },
    { question: "어떻게 오셨어요?", answer: "차타고요" },
  ];
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    const initial = Array(faq.length).fill(false);
    setVisible(initial);
  }, []);
  const toggle = (index) => {
    let copy = [...visible];
    copy[index] != copy[index];
    setVisible(copy);
  };
  return (
    <PageContainer>
      {faq.map((v, i) => (
        <ItemContainer>
          <QuestionContainer key={i}>
            <div>{faq[i].question}</div>
            <button onClick={toggle(i)}></button>
          </QuestionContainer>
          <AnswerContainer
            style={visible[i] ? { display: "block" } : { display: "none" }}
            key={i}
          >
            {faq[i].answer}
          </AnswerContainer>
        </ItemContainer>
      ))}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ItemContainer = styled.div`
  display: flex;
`;
const QuestionContainer = styled.div``;
const AnswerContainer = styled.div``;
