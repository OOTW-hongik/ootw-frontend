import React from "react";
import './MyCloset.css';

const MyCloset = () => {
  return (
    <div className="MyCloset mobileWeb">
        <div className="category">
            <div>아우터</div>
            <div>상의</div>
            <div>하의</div>
            <div>기타</div>
        </div>

        <div className="subCategory">
            <div>전체</div>
        </div>

        <div>
            <button className="registerClosetBtn">+</button>
        </div>

    </div>
  );
};

export default MyCloset;