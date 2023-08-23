import React from "react";
import { useLocation } from "react-router-dom";
import SelectCloth from "../components/SelectCloth";
import "../css/ChooseOutfit.css"


function ChooseOutfit() {
  const title = useLocation().state.category;
  const outfitId=useLocation().state.outfitId;
  // console.log("co",title,outfitId);

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
      <SelectCloth category={title} outfitId={outfitId}></SelectCloth>
    </div>
  );
}

export default ChooseOutfit;
