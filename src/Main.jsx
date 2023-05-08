import './Main.css';
// import axios from 'axios';
// import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import BottomNav from "./BottomNav";

function Main() {
  // const [weather, setWeather] = useState();
  // useEffect(() => {
  //   fetch('https://apihub.kma.go.kr/api/typ01/url/kma_sfcdd.php?tm=20150715&stn=0&help=1&authKey=LY63uUczQTmOt7lHMyE5XA', {
  //     method: "GET"
  //   }).then(res => res.json()).then(res => {
  //     console.log(1, res);
  //     setWeather(res);
  //   });
  // }, []);


  return (
    <div className="Main mobileWeb">
      <div className='areaSwitchBtn'>
        <FaMapMarkerAlt />서울
      </div>
      <div>날씨</div>
      <div>그래프</div>

      <button className='registerOutfitBtn'>착장 기록하기</button>

      <div>비슷한 체감온도에서 입었던 옷이에요</div>
      <div>리스트1</div>
      <div>리스트2</div>
      <div>리스트3</div>
      <BottomNav selectedNav="main"/>
    </div>
  );
}

export default Main;
