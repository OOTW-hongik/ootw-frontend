import React from "react";
import { useLocation } from "react-router-dom";
import SelectCloth from "../components/SelectCloth";
import "../css/ChooseOutfit.css"


function ChooseOutfit() {
  const title = useLocation().state;

  return (
    <div className="ChooseOutfit mobileWeb">
      <div
        style={{
          fontSize: "30px",
          padding: "20px",
        }}
      >
        {title} 선택
      </div> 
      <SelectCloth category={title}></SelectCloth>
    </div>
  );
}

export default ChooseOutfit;
