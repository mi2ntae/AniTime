import React, { useState } from "react";
import Modal from "./Modal";

export default function ModalTestButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((p) => !p);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
      >
        modal
      </button>
      {isOpen && (
        <Modal close={() => setIsOpen(false)} posX="10px" posY="10px">
          <p>modal content</p>
        </Modal>
      )}
    </>
  );
}
