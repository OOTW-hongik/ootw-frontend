import "../css/RegisterOutfit.css";
import AreaSwitchBtn from "../components/AreaSwitchBtn";
import RegisterCategory from "../components/RegisterCategory";
import MiniWeather from "../components/MiniWeather";
import { TfiSave } from "react-icons/tfi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { ko } from 'date-fns/esm/locale';
import NoServerAlert from "../components/NoServerAlert";


function RegisterOutfit() {
  const [startDate, setStartDate] = useState(new Date());
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [inputtedDate, setInputtedDate] = useState(dateToStr(startDate));
  const [fetchLocationInfo, setFetchLocationInfo] = useState("서울경기");
  const [fetchWeatherInfo, setFetchWeatherInfo] = useState({
    skyCondition: 0,
    highWc: 0,
    lowWc: 0,
    highTemp: 0,
    lowTemp: 0
  });
  const [ratingInfo, setRatingInfo] = useState([2, 2, 2, 2]);
  const [inputtedComment, setInputtedComment] = useState("");
  const [errorMsg, setErrorMsg] = useState();

  const ratingChange = (index, value) => {
    let copy = [...ratingInfo];
    copy[index] = value;
    setRatingInfo(copy)
  };
  const commentChange = (e) => {
    setInputtedComment(e.target.value);
  };
  useEffect(() => {
    fetch('http://43.200.138.39:8080/home?memberId=1', {
      method: "GET"
    }).then(res => res.json()).then(res => {
      setFetchLocationInfo(res.location);
    })
      .catch((error) => setErrorMsg(error.message));
  }, []);
  useEffect(() => {
    fetch(`http://43.200.138.39:8080/outfit/register?outfitDate=${inputtedDate}&outfitLocation=${fetchLocationInfo}`
    ).then(res => res.json()).then(res => {
      setFetchWeatherInfo(res);
    })
      .catch((error) => setErrorMsg(error.message));
  }, [inputtedDate, fetchLocationInfo]);
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
          skyCondition: fetchWeatherInfo.skyCondition,
          highWc: fetchWeatherInfo.highWc,
          lowWc: fetchWeatherInfo.lowWc,
          highTemp: fetchWeatherInfo.highTemp,
          lowTemp: fetchWeatherInfo.lowTemp,
          outerRating: ratingInfo[0],
          topRating: ratingInfo[1],
          bottomRating: ratingInfo[2],
          etcRating: ratingInfo[3],
          outfitComment: inputtedComment,
          "outerIdList": [
            7, 3
          ],
          "topIdList": [
            1
          ],
          "bottomIdList": [
            2
          ],
          "etcIdList": [

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
    return (`${date.getFullYear()}-${dM < 10 ? 0 + "" + dM : dM}-${dD < 10 ? 0 + "" + dD : dD}(${week[date.getDay()]})`);

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
          <AreaSwitchBtn fetchLocationInfo={fetchLocationInfo} changeLocationInfo={(value) => setFetchLocationInfo(value)} />
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
