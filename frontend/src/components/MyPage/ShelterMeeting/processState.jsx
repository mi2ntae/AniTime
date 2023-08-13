import { css, styled } from "styled-components";

export const processState = (item) => {
  let state = item.state;
  let text = "";
  switch (state) {
    case 0:
      text = "승인대기";
      break;
    case 1:
      text = "승인";
      break;
    case 2:
      text = "반려";
      break;
  }
  if (state == 1) {
    const rDate = new Date(item.reservedDate);
    const nDate = new Date();
    const diff = rDate.getTime() - nDate.getTime();
    // 30분
    if (diff < -1800000) {
      state = 3;
      text = "종료";
    } else if (diff < 1800000) {
      text = "미팅 참여";
    }
  }
  return <StateText $state={state}>{text}</StateText>;
};

const StateText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  width: 64px;
  height: 25px;
  padding: 0px;
  margin: 8px;
  font-size: 14px;
  ${({ $state }) => {
    switch ($state) {
      case 0:
        return css`
          background-color: #ff7676;
          color: #ffffff;
          font-weight: 800;
        `;
      case 1:
        return css`
          background-color: #e1f0ff;
          color: #3994f0;
          border: #3994f0 1px solid;
        `;
      case 2:
        return css`
          background-color: #fbeeee;
          color: #ff7676;
          border: #ff7676 1px solid;
        `;
      case 3:
        return css`
          background-color: #f7f8fa;
          color: #535a61;
          border: #535a61 1px solid;
        `;
    }
  }}
`;
