import React, { useState } from "react";
import Modal from "./Modal";
import { Button } from "styled/styled";

export default function ModalTestButton() {
  // 모달을 열고 닫는 것을 관리하는 스테이트 선언
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((p) => !p);

  return (
    <>
      {/* styled Button 사용 */}
      <Button
        width="50px"
        height="30px"
        onClick={(event) => {
          // 버블링을 막기위해 event.stopPropagation() 사용
          event.stopPropagation();
          toggleOpen();
        }}
      >
        modal
        {/* 모달 본체를 버튼 안에 넣기 */}
        {isOpen && (
          // close : 모달을 닫는 액션
          // posX: 오른쪽으로 이동
          // posY: 아래로 이동
          // center: "true"넣으면 정중앙으로 이동
          <Modal close={() => setIsOpen(false)} posX="25px" posY="25px">
            {/* 모달창 안에 넣을 컨텐츠를 html태그나 컴포넌트로 넣기(크기 지정해주기) */}
            <p>modal content</p>
          </Modal>
        )}
      </Button>
    </>
  );
}
