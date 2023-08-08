import "../css/RegisterOutfit.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TfiTrash, TfiPencilAlt } from "react-icons/tfi";
import MiniWeather from "../components/MiniWeather";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import NoServerAlert from "../components/NoServerAlert";
import OutfitCateRead from "./OutfitCateRead";

function OutfitRead() {
  const [fetchInfo, setFetchInfo] = useState({
    outfitId: 0,
    outfitDate: "string",
    outfitLocation: "string",
    skyCondition: 0,
    highWc: 0,
    lowWc: 0,
    highTemp: 0,
    lowTemp: 0,
    outerRating: 0,
    topRating: 0,
    bottomRating: 0,
    etcRating: 0,
    outfitComment: "string",
    outers: [
      {
        clothesUrl: "string",
        clothesId: 0,
      },
    ],
    tops: [
      {
        clothesUrl: "string",
        clothesId: 0,
      },
    ],
    bottoms: [
      {
        clothesUrl: "string",
        clothesId: 0,
      },
    ],
    etcs: [
      {
        clothesUrl: "string",
        clothesId: 0,
      },
    ],
  });
  const [errorMsg, setErrorMsg] = useState();
  const outfitId = useParams().outfitId;

  useEffect(() => {
    fetch(`http://43.200.138.39:8080/outfit/?outfitId=${outfitId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchInfo(res);
      })
      .catch((error) => setErrorMsg(error.message));
  }, []);

  return (
    <div className="RegisterOutfit mobileWeb">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <div className="upperWrapper">
        <div>
          <div className="datePicker">{fetchInfo.outfitDate}</div>
          <div id="areaSwitchBtn"><FaMapMarkerAlt /> {fetchInfo.outfitLocation}</div>
          
        </div>
        <MiniWeather
          skyCondition={fetchInfo.skyCondition}
          lowTemp={fetchInfo.lowTemp}
          highTemp={fetchInfo.highTemp}
          lowWc={fetchInfo.lowWc}
          highWc={fetchInfo.highWc}
        />
      </div>

      <div className="lowerWrapper">
        <OutfitCateRead title="아우터" clothes={fetchInfo.outers} rating={fetchInfo.outerRating}/>
        <OutfitCateRead title="상의" clothes={fetchInfo.tops} rating={fetchInfo.topRating}/>
        <OutfitCateRead title="하의" clothes={fetchInfo.bottoms} rating={fetchInfo.bottomRating}/>
        <OutfitCateRead title="기타" clothes={fetchInfo.etcs} rating={fetchInfo.etcRating}/>

        <div className="comment centerLeftRight">
          <div className="commentTitle">한줄평</div>
          <div id="inputtedComment">{fetchInfo.outfitComment}</div>
        </div>

        <TfiPencilAlt
          style={{position:"absolute"}}
          id="leftBtn"
          size={25}
          onClick={() => {}}
        />

        <TfiTrash
          style={{position:"absolute"}}
          id="rightBtn"
          size={25}
          // onClick={ClothesDelete}
        />
      </div>
    </div>
  );
}

export default OutfitRead;
