import React from "react";
import "../css/Modal.css";
type Props = {
  children: React.ReactNode;
  closeModal:()=>void;
}
function Modal({children,closeModal}:Props) {

  function closeM() {
    closeModal();
  }

  return (
    <div className="Modal" onClick={closeM}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeM}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
