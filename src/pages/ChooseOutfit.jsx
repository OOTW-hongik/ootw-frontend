import React from "react";
import { useLocation } from "react-router-dom";
import MyClosetSub from "../components/MyClosetSub";
import "../css/ChooseOutfit.css"

function ChooseOutfit() {
  const title = useLocation().state.title;
  return (
    <div className="ChooseOutfit mobileWeb">
      <div
        style={{
          fontSize: "30px",
          padding: "20px",
          borderBottom: "solid 1px gray",
        }}
      >
        {title} 선택
      </div> 
      <MyClosetSub category={title}></MyClosetSub>
    </div>
  );
}

export default ChooseOutfit;
