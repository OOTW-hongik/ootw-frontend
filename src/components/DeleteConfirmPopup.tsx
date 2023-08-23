import React from "react";
import "../css/Modal.css";
type Props = {
  confirmDel:()=>void;
  cancelDel:()=>void;
}
function DeleteConfirmPopup({confirmDel, cancelDel}:Props) {

  return (
    <div className="Modal" onClick={cancelDel}>
      <div className="popupBody" onClick={(e) => e.stopPropagation()}>
        <div style={{"paddingBottom":"20px"}}>이 기록을 삭제할까요?</div>
        <div className="pointer" id="confirmDel" onClick={confirmDel}>삭제</div>
        <div className="pointer" id="cancelDel" onClick={cancelDel}>취소</div>
      </div>
    </div>
  );
}

export default DeleteConfirmPopup;
