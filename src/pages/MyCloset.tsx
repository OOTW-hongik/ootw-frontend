import React, { useState } from "react";
import '../css/MyCloset.css';
import BottomNav from "../components/BottomNav";
import MyClosetSub from "../components/MyClosetSub";

const MyCloset = () => {
  const [selectedCate, setSelectedCate] = useState("아우터");
  return (
    <div className="MyCloset mobileWeb">
      <div className="category">
        <div
          onClick={() => setSelectedCate("아우터")}
          className={selectedCate === "아우터" ? "selected" : ""}>
          아우터
        </div>
        <div
          onClick={() => setSelectedCate("상의")}
          className={selectedCate === "상의" ? "selected" : ""}>
          상의
        </div>
        <div onClick={() => setSelectedCate("하의")}
          className={selectedCate === "하의" ? "selected" : ""}>
          하의
        </div>
        <div onClick={() => setSelectedCate("기타")}
          className={selectedCate === "기타" ? "selected" : ""}>
          기타
        </div>
      </div>

      <MyClosetSub category={selectedCate} />

      <BottomNav selectedNav="mycloset"/>
    </div>
  );
};

export default MyCloset;