import "../css/RegisterOutfit.css";
import "react-datepicker/dist/react-datepicker.css";

import { TfiSave } from "react-icons/tfi";
import DatePicker from "react-datepicker";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ko } from 'date-fns/esm/locale';

import NoServerAlert from "../components/NoServerAlert";
import AreaSwitchBtn from "../components/AreaSwitchBtn";
import OutfitCateCreate from "../components/OutfitCateCreate";
import MiniWeather from "../components/MiniWeather";

function RegisterOutfit() {
  const [startDate, setStartDate] = useState(new Date());
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [inputtedDate, setInputtedDate] = useState(dateToStr(startDate));
  const [fetchLocationInfo, setFetchLocationInfo] = useState();
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
  const outfitId = useLocation().state.outfitId;
  // console.log("outfitId", outfitId);

  const ratingChange = (index, value) => {
    let copy = [...ratingInfo];
    copy[index] = value;
    setRatingInfo(copy);
    // console.log("ratingChange", copy);
  };
  useLayoutEffect(() => { // 페이지 첫 진입 ~ 화면뜨기 전

    let ssInputtedDate = sessionStorage.getItem(`inputtedDate${outfitId}`);
    if (ssInputtedDate) {
      let ssDate = new Date(ssInputtedDate);
      setStartDate(ssDate);
      setInputtedDate(ssInputtedDate);
    }

    let ssFetchLocationInfo = sessionStorage.getItem(`fetchLocationInfo${outfitId}`);
    if (ssFetchLocationInfo) setFetchLocationInfo(ssFetchLocationInfo);

    let ssInputtedComment = sessionStorage.getItem(`inputtedComment${outfitId}`);
    if (ssInputtedComment) setInputtedComment(ssInputtedComment);
  }, []);

  useEffect(() => { // 평가 데이터 불러오기
    let ssRatingInfo = sessionStorage.getItem(`ratingInfo${outfitId}`)?.split(",");
    if (ssRatingInfo) {
      let arr = [Number(ssRatingInfo[0]), Number(ssRatingInfo[1]), Number(ssRatingInfo[2]), Number(ssRatingInfo[3])]
      setRatingInfo(arr);
    } else {
      setRatingInfo([3, 3, 3, 3]); // 없으면 
    }
  }, [])

  useEffect(() => { // 날짜,위치,평가,한줄평 세션에 저장
    console.log(inputtedDate,fetchLocationInfo,ratingInfo);
    if (inputtedDate && fetchLocationInfo) {
      sessionStorage.setItem(`inputtedDate${outfitId}`, inputtedDate);
      sessionStorage.setItem(`fetchLocationInfo${outfitId}`, fetchLocationInfo);
      sessionStorage.setItem(`inputtedComment${outfitId}`, inputtedComment);
    }
    if (ratingInfo[0] && ratingInfo[1] && ratingInfo[2] && ratingInfo[3]) { //안비어있으면
      let arr = [3, 3, 3, 3];
      arr[0] = ratingInfo[0]
      arr[1] = ratingInfo[1]
      arr[2] = ratingInfo[2]
      arr[3] = ratingInfo[3]
      sessionStorage.setItem(`ratingInfo${outfitId}`, arr);
      // console.log(ratingInfo);
    }

  }, [inputtedDate, fetchLocationInfo, ratingInfo, inputtedComment]);


  useEffect(() => { // 날짜, 위치 변경 시 날씨정보 받아옴 
    if (inputtedDate && fetchLocationInfo) {
      //console.log("날씨요청", inputtedDate, fetchLocationInfo)
      fetch(`http://43.200.138.39:8080/outfit/register?outfitDate=${inputtedDate}&outfitLocation=${fetchLocationInfo}`
      ).then(res => res.json()).then(res => {
        setFetchWeatherInfo(res);
      })
        .catch((error) => setErrorMsg(error.message));
    }
  }, [inputtedDate, fetchLocationInfo]);

  function dateToStr(date) {
    let dD = date.getDate();
    let dM = date.getMonth() + 1;
    return (`${date.getFullYear()}-${dM < 10 ? 0 + "" + dM : dM}-${dD < 10 ? 0 + "" + dD : dD}(${week[date.getDay()]})`);
  }

  function register() {
    const ssRating = sessionStorage.getItem(`ratingInfo${outfitId}`);
    const ssOuter = sessionStorage.getItem(`inputted아우터${outfitId}`);
    const ssTop = sessionStorage.getItem(`inputted상의${outfitId}`);
    const ssBottom = sessionStorage.getItem(`inputted하의${outfitId}`);
    const ssEtc = sessionStorage.getItem(`inputted기타${outfitId}`);
    if (ssOuter && ssTop && ssBottom) {
      const outerIdList = ssOuter.split(",").map(Number);
      const topIdList = ssTop.split(",").map(Number);
      const bottomIdList = ssBottom.split(",").map(Number);
      let etcIdList;
      if (ssEtc) {
        etcIdList = ssEtc.split(",").map(Number);
      } else { etcIdList = [] }
      console.log(outerIdList, topIdList, bottomIdList, etcIdList);
      if (outfitId) { // update outfit

        console.log("put",outfitId);
        fetch(`http://43.200.138.39:8080/outfit/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            outfitId: outfitId,
            outfitDate: inputtedDate,
            outfitLocation: fetchLocationInfo,
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
            outerIdList: outerIdList,
            topIdList: topIdList,
            bottomIdList: bottomIdList,
            etcIdList: etcIdList
          }),
        });
      } else { // create outfit
        console.log("post",outfitId);
        fetch(`http://43.200.138.39:8080/outfit/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId: 1,
            outfitDate: inputtedDate,
            outfitLocation: fetchLocationInfo,
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
            outerIdList: outerIdList,
            topIdList: topIdList,
            bottomIdList: bottomIdList,
            etcIdList: etcIdList
          }),
        });
      }

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
          <AreaSwitchBtn whereUsed={outfitId} changeLocationInfo={(value) => setFetchLocationInfo(value)} />
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

        <OutfitCateCreate title="아우터" ratingChange={ratingChange} outfitId={outfitId} />
        <OutfitCateCreate title="상의" ratingChange={ratingChange} outfitId={outfitId} />
        <OutfitCateCreate title="하의" ratingChange={ratingChange} outfitId={outfitId} />
        <OutfitCateCreate title="기타" ratingChange={ratingChange} outfitId={outfitId} />

        <div className="comment centerLeftRight">
          <div className="commentTitle">한줄평</div>
          <input className="inputBorder" type="text" placeholder="한줄평을 입력해보세요." value={inputtedComment} onChange={(e) => {
            setInputtedComment(e.target.value);
          }} />
        </div>

        <TfiSave id="registerSaveBtn" className="centerLeftRight" onClick={register} />
      </div>
    </div>
  );
}


export default RegisterOutfit;
