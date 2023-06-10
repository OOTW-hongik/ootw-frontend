import '../css/Home.css';
// import axios from 'axios';
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import AreaSwitchBtn from "../components/AreaSwitchBtn";
import { Link } from "react-router-dom";

const Home = () => {

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
    <div className="Home mobileWeb">
      <AreaSwitchBtn />
      <div>날씨</div>
      <div>그래프</div>
      <Link to="/registeroutfit" style={{ textDecoration: "none" }} >
        <button className='registerOutfitBtn centerLeftRight'>
          착장 기록하기
        </button>
      </Link>
      <div>비슷한 체감온도에서 입었던 옷이에요</div>
      <div>리스트1</div>
      <div>리스트2</div>
      <div>리스트3</div>
      <BottomNav selectedNav="home" />
    </div>
  );
}

export default Home;
