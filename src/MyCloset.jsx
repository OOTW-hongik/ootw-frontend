import React, { useState } from "react";
import './MyCloset.css';

const MyCloset = () => {
  const [selectedCate, setSelectedCate] = useState("outer");
  return (
    <div className="MyCloset mobileWeb">
      <div className="category">
        <div
          onClick={() => setSelectedCate("outer")}
          className={selectedCate === "outer" ? "selected" : ""}>
          아우터
        </div>
        <div
          onClick={() => setSelectedCate("top")}
          className={selectedCate === "top" ? "selected" : ""}>
          상의
        </div>
        <div onClick={() => setSelectedCate("bottom")}
          className={selectedCate === "bottom" ? "selected" : ""}>
          하의
        </div>
        <div onClick={() => setSelectedCate("etc")}
          className={selectedCate === "etc" ? "selected" : ""}>
          기타
        </div>
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