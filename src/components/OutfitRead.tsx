import "../css/RegisterOutfit.css";
import "react-datepicker/dist/react-datepicker.css";

import { FaMapMarkerAlt } from "react-icons/fa";
import { TfiTrash, TfiPencilAlt } from "react-icons/tfi";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import NoServerAlert from "../components/NoServerAlert";
import MiniWeather from "../components/MiniWeather";
import { ratingList } from "./reuse";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

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
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const outfitId = useParams().outfitId;
  function beforeUpdate() {
    const outerIdList = fetchInfo.outers.map((element) => {
      return element.clothesId;
    });
    const topIdList = fetchInfo.tops.map((element) => {
      return element.clothesId;
    });
    const bottomIdList = fetchInfo.bottoms.map((element) => {
      return element.clothesId;
    });
    const etcIdList = fetchInfo.etcs.map((element) => {
      return element.clothesId;
    });
    sessionStorage.setItem(`inputtedDate${outfitId}`, fetchInfo.outfitDate);
    sessionStorage.setItem(
      `fetchLocationInfo${outfitId}`,
      fetchInfo.outfitLocation
    );
    sessionStorage.setItem(
      `inputtedComment${outfitId}`,
      fetchInfo.outfitComment
    );
    sessionStorage.setItem(`inputted아우터${outfitId}`, String(outerIdList));
    sessionStorage.setItem(`inputted상의${outfitId}`, String(topIdList));
    sessionStorage.setItem(`inputted하의${outfitId}`, String(bottomIdList));
    sessionStorage.setItem(`inputted기타${outfitId}`, String(etcIdList));
    sessionStorage.setItem(
      `ratingInfo${outfitId}`,
      fetchInfo.outerRating +
        "," +
        fetchInfo.topRating +
        "," +
        fetchInfo.bottomRating +
        "," +
        fetchInfo.etcRating
    );
  }
  function outfitDelete() {
    fetch(`http://43.200.138.39:8080/outfit/?outfitId=${outfitId}`, {
      method: "DELETE",
    }).catch((error) => setErrorMsg(error.message));
    window.location.reload();
  }
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
      {isPopupOpened && <DeleteConfirmPopup confirmDel={outfitDelete} cancelDel={()=>setIsPopupOpened(false)} />}
      <div className="upperWrapper">
        <div>
          <div className="datePicker">{fetchInfo.outfitDate}</div>
          <div id="areaSwitchBtn">
            <FaMapMarkerAlt /> {fetchInfo.outfitLocation}
          </div>
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
        <OutfitCateRead
          title="아우터"
          clothes={fetchInfo.outers}
          rating={fetchInfo.outerRating}
        />
        <OutfitCateRead
          title="상의"
          clothes={fetchInfo.tops}
          rating={fetchInfo.topRating}
        />
        <OutfitCateRead
          title="하의"
          clothes={fetchInfo.bottoms}
          rating={fetchInfo.bottomRating}
        />
        <OutfitCateRead
          title="기타"
          clothes={fetchInfo.etcs}
          rating={fetchInfo.etcRating}
        />

        <div className="comment centerLeftRight">
          <div className="commentTitle">한줄평</div>
          <div id="inputtedComment">{fetchInfo.outfitComment}</div>
        </div>

        <div id="btnWrapper">
          <Link to="/registerOutfit" state={{ outfitId: outfitId }}>
            <TfiPencilAlt
              id="outfitUpdateBtn"
              onClick={beforeUpdate}
            />
          </Link>

          <TfiTrash className="pointer" id="outfitDeleteBtn" onClick={()=>setIsPopupOpened(true)} />
        </div>
        
      </div>
    </div>
  );
}

export default OutfitRead;

type Props = {
  title: string;
  clothes: Array<{ clothesUrl: string; clothesId: number }>;
  rating: number;
};
function OutfitCateRead({ title, clothes, rating }: Props) {
  return (
    <div className="RegisterCategory centerLeftRight">
      <div className="ratingWrapper">
        <div className="title">{title}</div>
        <div className={"ratingText" + ratingList[rating].cssName}>
          {ratingList[rating].text}
        </div>
      </div>

      <div className="col4GridContainer">
        {clothes.map((element) => (
          <div>
            {clothes[0] === element && (
              <button id="mainImgBtn">대표</button>
            )}
            <img
              id="clothes"
              src={element.clothesUrl}
              className="centerLeftRight"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
