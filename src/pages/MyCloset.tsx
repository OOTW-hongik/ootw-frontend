import React, { useState } from "react";
import '../css/MyCloset.css';
import BottomNav from "../components/BottomNav";
import MyClosetSub from "../components/MyClosetSub";

const MyCloset = () => {
  const [selectedCate, setSelectedCate] = useState("아우터");
  return (
    <div className="MyCloset mobileWeb">
      <h3 className="pageTitle">내 옷장</h3>
      <div className="categoryWrapper">
        <div
          onClick={() => setSelectedCate("아우터")}
          className={selectedCate === "아우터" ? "category selected" : "category"}>
          아우터
        </div>
        <div
          onClick={() => setSelectedCate("상의")}
          className={selectedCate === "상의" ? "category selected" : "category"}>
          상의
        </div>
        <div onClick={() => setSelectedCate("하의")}
          className={selectedCate === "하의" ? "category selected" : "category"}>
          하의
        </div>
        <div onClick={() => setSelectedCate("기타")}
          className={selectedCate === "기타" ? "category selected" : "category"}>
          기타
        </div>
      </div>

      <MyClosetSub category={selectedCate} />

      <BottomNav selectedNav="mycloset"/>
    </div>
  );
};

export default MyCloset;