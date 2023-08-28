import React, { useState, useEffect } from "react";
import "../css/MyCloset.css";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";
import BottomNav from "../components/BottomNav";
import MyClosetSub from "../components/MyClosetSub";

const MyCloset = () => {
  const cateList = ["아우터", "상의", "하의", "기타"];
  const [selectedCate, setSelectedCate] = useState(cateList[0]);
  const [showHidden, setShowHidden] = useState(false);

  return (
    <div className="MyCloset mobileWeb">
      <div id="titleWrapper">
        <h3 className="pageTitle">내 옷장</h3>
        <div id="showHiddenBtn" onClick={() => setShowHidden(!showHidden)}>
          {showHidden ? (
            <BiCheckboxSquare className="hiddenCheckbox"/>
          ) : (
            <BiCheckbox className="hiddenCheckbox" />
          )}
          숨긴 옷 보기
        </div>
      </div>
      <div className="categoryWrapper">
        {cateList.map((element) => (
          <div
            onClick={() => setSelectedCate(element)}
            className={
              selectedCate === element ? "category selected" : "category"
            }
          >
            {element}
          </div>
        ))}
      </div>

      <MyClosetSub category={selectedCate} showHidden={showHidden} />

      <BottomNav selectedNav="mycloset" />
    </div>
  );
};

export default MyCloset;
