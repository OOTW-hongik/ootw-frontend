import React from "react";
import './OutfitList.css';
import { BiFilterAlt, BiSort } from "react-icons/bi"
import BottomNav from "./BottomNav";

const OutfitList = () => {
  // const [isSortClicked, setIsSortClicked] = useState(false);
  return (
    <div className="OutfitList mobileWeb">

      <h2> 님의 기록</h2>
      <div className="btnWrapper">
        <button><BiFilterAlt className="icon" />필터</button>
        <button><BiSort className="icon" />정렬</button>
      </div>
      <BottomNav selectedNav="outfitlist"/>
    </div>
  );
};

export default OutfitList;