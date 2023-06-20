import "../css/Home.css";
// import axios from 'axios';
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import AreaSwitchBtn from "../components/AreaSwitchBtn";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { weatherIconList } from "../components/reuse";
import Outfit from "../components/Outfit";

ChartJS.register(...registerables);

const Home = () => {
  const [fetchLocationInfo, setFetchLocationInfo] = useState("");
  const [fetchOutfitList, setFetchOutfitList] = useState([]);
  const changeLocationInfo = (value:string) => {
    setFetchLocationInfo(value);
  };
  useEffect(() => {
    fetch("http://43.200.138.39:8080/home?memberId=1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchLocationInfo(res.location);
        setFetchOutfitList(res.outfitResponseList);
      });
  }, []);
  //location 바뀔때마다 fetch

  return (
    <div className="Home mobileWeb">
      <AreaSwitchBtn fetchLocationInfo={fetchLocationInfo} changeLocationInfo={changeLocationInfo}/>
      <WeatherBox />
      <Link to="/registeroutfit" style={{ textDecoration: "none" }}>
        <button id="registerOutfitBtn" className="centerLeftRight">
          착장 기록하기
        </button>
      </Link>
      <div style={{ marginBottom: "10px" }}>
        비슷한 체감온도에서 입었던 옷이에요
      </div>
      {fetchOutfitList &&
        fetchOutfitList
          .map((element) => <Outfit element={element} />)}
      <BottomNav selectedNav="home" />
    </div>
  );
};

export default Home;

function WeatherBox() {
  const [skyCondition, setSkyCondition] = useState(1);
  const weatherInfoList = [
    {
      id:0,
      time: 6,
      temp: 10,
      icon: 0,
    },
    {
      id:1,
      time: 9,
      temp: 21,
      icon: 2,
    },
    {
      id:2,
      time: 12,
      temp: 24,
      icon: 2,
    },
    {
      id:3,
      time: 15,
      temp: 18,
      icon: 2,
    },
    {
      id:4,
      time: 18,
      temp: 24,
      icon: 2,
    },
    {
      id:5,
      time: 21,
      temp: 21,
      icon: 2,
    },
    {
      id:6,
      time: 24,
      temp: 25,
      icon: 2,
    },
  ];
  return (
    <div id="WeatherBox" className="centerLeftRight">
      <div id="weatherUpperWrapper">
        <div id="weatherIcon">{weatherIconList[skyCondition].tag}</div>
        <div id="weatherTextWrapper">
          <div>
            <div id="width80">{weatherIconList[skyCondition].name}</div>
            <div className="width38">10°</div> /{" "}
            <div className="width38">25°</div>
          </div>
          <div>
            <div>체감</div> <div className="width38">12°</div> /{" "}
            <div className="width38">28°</div>
          </div>
        </div>
      </div>
      <div id="weatherIndexWrapper">
        {weatherInfoList.map((element) => (
          <div style={{ width: "30px" }} key={element.id}>
            <div style={{ fontSize: "13px" }} >{element.time}시</div>
            {/* <div>{weatherIconList[element.icon].tag}</div> */}
            <div style={{ fontSize: "15px" }}>{element.temp}°</div>
          </div>
        ))}
      </div>

      <WeatherGraph />
    </div>
  );
}

function WeatherGraph() {
  const data = {
    labels: ["06시", "09시", "12시", "15시", "18시", "21시", "24시"],
    datasets: [
      {
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: [10, 21, 24, 18, 24, 21, 25],
      },
    ],
  };
  const options = {
    pointBackgroundColor: "rgb(255,255,255)",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    events: [], //hover이벤트 삭제
    scales: {
      x: {
        grid: {
          //세로선들
          display: false,
        },
        border: {
          //x축 선
          display: false,
        },
        ticks: {
          //x축 라벨(몇시)
          // color: "rgb(255,255,255)",
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          //y축 라벨(몇도)
          display: false,
        },
      },
    },
  };

  return (
    <div id="WeatherGraph" className="centerLeftRight">
      <Line data={data} options={options} />
    </div>
  );
}
