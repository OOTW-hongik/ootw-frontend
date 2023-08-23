import "../css/RegisterOutfit.css";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import { TfiSave } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";

import MiniWeather from "./MiniWeather";
import NoServerAlert from "./NoServerAlert";
import AreaSwitchBtn from "./AreaSwitchBtn";
import OutfitCateCreate from "./OutfitCateCreate";

function OutfitUpdate() {
  const [startDate, setStartDate] = useState(new Date());
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [inputtedDate, setInputtedDate] = useState(dateToStr(startDate));
  const [inputtedLocation, setInputtedLocation] = useState();
  const [fetchWeatherInfo, setFetchWeatherInfo] = useState({
    skyCondition: 0,
    highWc: 0,
    lowWc: 0,
    highTemp: 0,
    lowTemp: 0
  });
  const [ratingInfo, setRatingInfo] = useState([]);
  const [inputtedComment, setInputtedComment] = useState("");
  const [errorMsg, setErrorMsg] = useState();

  const outfitId = useParams().outfitId;

  const ratingChange = (index, value) => {
    let copy = [...ratingInfo];
    copy[index] = value;
    setRatingInfo(copy);
    console.log("ratingChange", copy);
  };


  useEffect(() => { // 세션 데이터 불러오기
    let ssInputtedDate = sessionStorage.getItem(`inputtedDate${outfitId}`);
    if (ssInputtedDate) {
      let ssDate = new Date(ssInputtedDate);
      setStartDate(ssDate);
      setInputtedDate(ssInputtedDate);
    }

    let ssInputtedLoca = sessionStorage.getItem(`inputtedLoca${outfitId}`);
    if (ssInputtedLoca) setInputtedLocation(ssInputtedLoca);

    let ssInputtedComment = sessionStorage.getItem(`inputtedComment${outfitId}`);
    if (ssInputtedComment) setInputtedComment(ssInputtedComment);

    let ssRatingInfo = sessionStorage.getItem(`inputtedRating${outfitId}`)?.split(",");
    if (ssRatingInfo) {
      let arr = [Number(ssRatingInfo[0]), Number(ssRatingInfo[1]), Number(ssRatingInfo[2]), Number(ssRatingInfo[3])]
      setRatingInfo(arr);
    } 

  }, []);


  useEffect(() => { // 날짜,위치,평가,한줄평 세션에 저장
    if (inputtedDate && inputtedLocation) {
      sessionStorage.setItem(`inputtedDate${outfitId}`, inputtedDate);
      sessionStorage.setItem(`inputtedLoca${outfitId}`, inputtedLocation);
      sessionStorage.setItem(`inputtedComment${outfitId}`, inputtedComment);
    }
    if (ratingInfo[0] && ratingInfo[1] && ratingInfo[2] && ratingInfo[3]) { //안비어있으면
      let arr = [3, 3, 3, 3];
      arr[0] = ratingInfo[0]
      arr[1] = ratingInfo[1]
      arr[2] = ratingInfo[2]
      arr[3] = ratingInfo[3]
      sessionStorage.setItem(`inputtedRating${outfitId}`, arr);
      console.log(ratingInfo);
    }

  }, [inputtedDate, inputtedLocation, ratingInfo, inputtedComment]);


  useEffect(() => { // 날짜, 위치 변경 시 날씨정보 받아옴 
    if (inputtedDate && inputtedLocation) {
      //console.log("날씨요청", inputtedDate, fetchLocationInfo)
      fetch(`http://43.200.138.39:8080/outfit/register?outfitDate=${inputtedDate}&outfitLocation=${inputtedLocation}`
      ).then(res => res.json()).then(res => {
        setFetchWeatherInfo(res);
      })
        .catch((error) => setErrorMsg(error.message));
    }
  }, [inputtedDate, inputtedLocation]);

  function dateToStr(date) {
    let dD = date.getDate();
    let dM = date.getMonth() + 1;
    return (`${date.getFullYear()}-${dM < 10 ? 0 + "" + dM : dM}-${dD < 10 ? 0 + "" + dD : dD}(${week[date.getDay()]})`);
  }

  function register() {
    const ssRating = sessionStorage.getItem("ratingInfo");
    const ssOuter = sessionStorage.getItem("inputted아우터");
    const ssTop = sessionStorage.getItem("inputted상의");
    const ssBottom = sessionStorage.getItem("inputted하의");
    const ssEtc = sessionStorage.getItem("inputted기타");
    if (ssOuter && ssTop && ssBottom) {
      const outerIdList = ssOuter.split(",").map(Number);
      const topIdList = ssTop.split(",").map(Number);
      const bottomIdList = ssBottom.split(",").map(Number);
      let etcIdList;
      if (ssEtc) {
        etcIdList = ssEtc.split(",").map(Number);
      } else { etcIdList = [] }
      console.log(outerIdList, topIdList, bottomIdList, etcIdList);
      fetch(`http://43.200.138.39:8080/outfit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: 1,
          outfitDate: inputtedDate,
          outfitLocation: inputtedLocation,
          skyCondition: fetchWeatherInfo.skyCondition,
          highWc: fetchWeatherInfo.highWc,
          lowWc: fetchWeatherInfo.lowWc,
          highTemp: fetchWeatherInfo.highTemp,
          lowTemp: fetchWeatherInfo.lowTemp,
          outerRating: Number(ssRating[0]),
          topRating: Number(ssRating[2]),
          bottomRating: Number(ssRating[4]),
          etcRating: Number(ssRating[6]),
          outfitComment: inputtedComment,
          "outerIdList": outerIdList,
          "topIdList": topIdList,
          "bottomIdList": bottomIdList,
          "etcIdList": etcIdList
        }),
      });
      sessionStorage.clear();
      window.location.replace("/outfitList");
    } else {
      alert("아우터, 상의, 하의 선택 필수!");
    }
  }

  return (
    <div className="RegisterOutfit mobileWeb">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <div className="upperWrapper">
        <div>
          <DatePicker
            className="datePicker"
            dateFormat="yyyy-MM-dd (eee)"
            closeOnScroll={true}
            selected={startDate}
            locale={ko}
            onChange={(date) => {
              setStartDate(date);
              setInputtedDate(dateToStr(date));
            }}
          />
          <AreaSwitchBtn whereUsed="outfitUpdate" changeLocationInfo={(value) => setInputtedLocation(value)} />
        </div>
        <MiniWeather
          skyCondition={fetchWeatherInfo.skyCondition}
          lowTemp={fetchWeatherInfo.lowTemp}
          highTemp={fetchWeatherInfo.highTemp}
          lowWc={fetchWeatherInfo.lowWc}
          highWc={fetchWeatherInfo.highWc}
        />
      </div>

      <div className="lowerWrapper">

        <OutfitCateCreate title="아우터" ratingChange={ratingChange} />
        <OutfitCateCreate title="상의" ratingChange={ratingChange} />
        <OutfitCateCreate title="하의" ratingChange={ratingChange} />
        <OutfitCateCreate title="기타" ratingChange={ratingChange} />

        <div className="comment centerLeftRight">
          <div className="commentTitle">한줄평</div>
          <input type="text" placeholder="한줄평을 입력해보세요." value={inputtedComment} onChange={(e) => {
            setInputtedComment(e.target.value);
          }} />
        </div>

        <TfiSave id="registerSaveBtn" className="centerLeftRight" onClick={register} />
      </div>
    </div>
  );
}


export default OutfitUpdate;
