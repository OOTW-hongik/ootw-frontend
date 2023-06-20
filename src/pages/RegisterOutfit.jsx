import "../css/RegisterOutfit.css";
import AreaSwitchBtn from "../components/AreaSwitchBtn";
import RegisterCategory from "../components/RegisterCategory";
import MiniWeather from "../components/MiniWeather";
import { TfiSave } from "react-icons/tfi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { ko } from 'date-fns/esm/locale';


function RegisterOutfit() {
  const [startDate, setStartDate] = useState(new Date());
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [inputtedDate, setInputtedDate] = useState(dateToStr(startDate));
  const [fetchLocationInfo, setFetchLocationInfo] = useState("");
  const [fetchWeatherInfo, setFetchWeatherInfo] = useState([0, -19, 29, -25, 33]);
  const [ratingInfo, setRatingInfo] = useState([2, 2, 2, 2]);
  const [inputtedComment, setInputtedComment] = useState("");

  const ratingChange = (index, value) => {
    let copy = [...ratingInfo];
    copy[index] = value;
    setRatingInfo(copy)
  };
  const changeLocationInfo = (value) => {
    setFetchLocationInfo(value);
  };
  const commentChange = (e) => {
    setInputtedComment(e.target.value);
  };
  useEffect(() => {
    fetch('http://43.200.138.39:8080/home?memberId=1', {
      method: "GET"
    }).then(res => res.json()).then(res => {
      setFetchLocationInfo(res.location);
    });
  }, []);
  function register() {
    if (1) {
      fetch(`http://43.200.138.39:8080/outfit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: 1,
          outfitDate: inputtedDate,
          outfitLocation: fetchLocationInfo,
          skyCondition: fetchWeatherInfo[0],
          highWc: fetchWeatherInfo[4],
          lowWc: fetchWeatherInfo[3],
          highTemp: fetchWeatherInfo[2],
          lowTemp: fetchWeatherInfo[1],
          outerRating: ratingInfo[0],
          topRating: ratingInfo[1],
          bottomRating: ratingInfo[2],
          etcRating: ratingInfo[3],
          outfitComment: inputtedComment,
          clothesList: [
            1
          ]
        }),
      });
      window.location.replace("/outfitList");
    } else {
      alert("사진 필수!");
    }
  }
  function dateToStr(date) {
    let dD = date.getDate();
    let dM = date.getMonth() + 1;
    return (`${date.getFullYear()}` + `-${dM < 10 ? 0 + "" + dM : dM}`
      + `-${dD < 10 ? 0 + "" + dD : dD}` + ` (${week[date.getDay()]})`);

  }
  return (
    <div className="RegisterOutfit mobileWeb">
      <div className="upperWrapper">
        <div>
          <DatePicker
            className="datePicker"
            dateFormat="yyyy-MM-dd (eee)"
            closeOnScroll={true}
            selected={startDate}
            // inputProps={{ min: today }}
            locale={ko}
            onChange={(date) => {
              setStartDate(date);
              setInputtedDate(dateToStr(date));
            }}
          />
          <AreaSwitchBtn fetchLocationInfo={fetchLocationInfo} changeLocationInfo={changeLocationInfo} />
        </div>
        <MiniWeather
          skyCondition={fetchWeatherInfo[0]}
          lowTemp={fetchWeatherInfo[1]}
          highTemp={fetchWeatherInfo[2]}
          lowWc={fetchWeatherInfo[3]}
          highWc={fetchWeatherInfo[4]}
        />
      </div>

      <div className="lowerWrapper">

        <RegisterCategory title="아우터" ratingChange={ratingChange} />
        <RegisterCategory title="상의" ratingChange={ratingChange} />
        <RegisterCategory title="하의" ratingChange={ratingChange} />
        <RegisterCategory title="기타" ratingChange={ratingChange} />

        <div className="comment centerLeftRight">
          <div className="commentTitle">한줄평</div>
          <input type="text" placeholder="한줄평을 입력해보세요." onChange={commentChange} />
        </div>

        <TfiSave id="registerSaveBtn" className="centerLeftRight" onClick={register} />
      </div>
    </div>
  );
}


export default RegisterOutfit;
