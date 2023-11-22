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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [inputtedDate, setInputtedDate] = useState<string>(dateToStr(startDate));
  const [fetchLocationInfo, setFetchLocationInfo] = useState<string>();
  const [fetchWeatherInfo, setFetchWeatherInfo] = useState({
    skyCondition: 0,
    highWc: 0,
    lowWc: 0,
    highTemp: 0,
    lowTemp: 0
  });
  const [ratingInfo, setRatingInfo] = useState<number[]>([]);
  const [inputtedComment, setInputtedComment] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState();
  const outfitId = useLocation().state.outfitId;
  // console.log("outfitId", outfitId);

  const ratingChange = (index:number, value:number) => {
    let copy:number[] = [...ratingInfo];
    copy[index] = value;
    setRatingInfo(copy);
    // console.log("ratingChange", copy);
  };
  useLayoutEffect(() => { // 페이지 첫 진입 ~ 화면뜨기 전

    let ssInputtedDate = sessionStorage.getItem(`inputtedDate${outfitId}`);
    if (ssInputtedDate) {
      // 크로스 브라우징 이슈 방지 : Date(year,month,day)
      let ssDate = new Date(Number(ssInputtedDate.slice(0, 4)), Number(ssInputtedDate.slice(5, 7)) - 1, Number(ssInputtedDate.slice(8, 10)));
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
    console.log(inputtedDate, fetchLocationInfo, ratingInfo);
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
      sessionStorage.setItem(`ratingInfo${outfitId}`, String(arr));
      // console.log(ratingInfo);
    }

  }, [inputtedDate, fetchLocationInfo, ratingInfo, inputtedComment]);


  useEffect(() => { // 날짜, 위치 변경 시 날씨정보 받아옴 
    if (inputtedDate && fetchLocationInfo) {
      //console.log("날씨요청", inputtedDate, fetchLocationInfo)
      fetch(`https://api.ootw.store/outfit/register?outfitDate=${inputtedDate}&outfitLocation=${fetchLocationInfo}`
        , {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("AccessToken"),
          },
        }).then(res => res.json()).then(res => {
          setFetchWeatherInfo(res);
        })
        .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
    }
  }, [inputtedDate, fetchLocationInfo]);

  function dateToStr(date :Date) {
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
    if (ssRating && ssOuter && ssTop && ssBottom) {
      const outerIdList = ssOuter.split(",").map(Number);
      const topIdList = ssTop.split(",").map(Number);
      const bottomIdList = ssBottom.split(",").map(Number);
      let etcIdList:number[];
      if (ssEtc) {
        etcIdList = ssEtc.split(",").map(Number);
      } else { etcIdList = [] }
      console.log(outerIdList, topIdList, bottomIdList, etcIdList);
      if (outfitId) { // update outfit

        console.log("put", outfitId);
        fetch(`https://api.ootw.store/outfit/${outfitId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

            Authorization: 'Bearer ' + localStorage.getItem("AccessToken"),

          },
          body: JSON.stringify({
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
        }).then(() => {
          sessionStorage.clear();
          window.location.replace("/outfitList");
        })
          .catch((error) => {
          if (error.status === 401) {
            localStorage.removeItem("AccessToken");
            window.location.reload();
          }
          window.alert(error.message);
        });
      } else { // create outfit -> outfitid=0
        console.log("post", outfitId);
        fetch(`https://api.ootw.store/outfit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("AccessToken"),
          },
          body: JSON.stringify({
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
          })
          ,
        }).then(() => {
          sessionStorage.clear();
          window.location.replace("/outfitList");
        })
          .catch((error) => {
          if (error.status === 401) {
            localStorage.removeItem("AccessToken");
            window.location.reload();
          }
          window.alert(error.message);
        });
      }


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
            maxDate={new Date()}
            locale={ko}
            onChange={(date:Date) => {
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
