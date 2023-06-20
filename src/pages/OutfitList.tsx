import React, {useState,useEffect }from "react";
import "../css/OutfitList.css";
import { BiFilterAlt, BiSort } from "react-icons/bi";
import BottomNav from "../components/BottomNav";
import Outfit from "../components/Outfit";

const OutfitList = () => {
  // const [isSortClicked, setIsSortClicked] = useState(false);
    const [fetchNameInfo, setFetchNameInfo] = useState();
    const [fetchOutfitList, setFetchOutfitList] = useState([]);
  useEffect(() => {
    fetch('http://43.200.138.39:8080/outfit/list?memberId=1', {
      method: "GET"
    }).then(res => res.json()).then(res => {
      setFetchNameInfo(res.name);
      setFetchOutfitList(res.outfitResponse);
    });
  }, []);
  return (
    <div className="OutfitList mobileWeb">
      <div id="titleWrapper">
        <h3 className="pageTitle">{fetchNameInfo} 님의 기록</h3>
        <div id="btnWrapper">
          <div>
            <BiFilterAlt className="icon" /> 적당
          </div>
          <div>
            <BiSort className="icon" /> 등록순
          </div>
        </div>
      </div>

      {fetchOutfitList && fetchOutfitList.map((element) => (
        <Outfit element={element} />
        ))}
        <div style={{paddingBottom:"90px"}} />
      <BottomNav selectedNav="outfitlist" />
    </div>
  );
};

export default OutfitList;
