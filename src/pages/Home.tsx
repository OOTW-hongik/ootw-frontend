import "../css/Home.css";
// import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from "react";
import BottomNav from "../components/BottomNav";
import AreaSwitchBtn from "../components/AreaSwitchBtn";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { weatherIconList } from "../components/reuse";
import Outfit from "../components/Outfit";
import NoServerAlert from "../components/NoServerAlert";

ChartJS.register(...registerables);

const Home = () => {
  const [fetchLocationInfo, setFetchLocationInfo] = useState("");
  const [fetchOutfitList, setFetchOutfitList] = useState([
    {
      outfitId: 0,
      outfitDate: "string",
      skyCondition: 0,
      highWc: 0,
      lowWc: 0,
      highTemp: 0,
      lowTemp: 0,
      outerRating: 0,
      topRating: 0,
      bottomRating: 0,
      outerUrl: "string",
      topUrl: "string",
      bottomUrl: "string",
      manyOuter: false,
      manyTop: false,
      manyBottom: false,
    },
  ]);
  const [errorMsg, setErrorMsg] = useState();
  useLayoutEffect(() => {
    fetch("http://43.200.138.39:8080/home?memberId=1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchOutfitList(res.outfitSummaryList);
      })
      .catch((error) => setErrorMsg(error.message));
  }, []);


  return (
    <div className="Home mobileWeb">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <AreaSwitchBtn
        changeLocationInfo={(value: string) => {
          setFetchLocationInfo(value);
        }}
        whereUsed="home"
      />
      <WeatherBox fetchLocationInfo={fetchLocationInfo} />
      <Link to="/registeroutfit" style={{ textDecoration: "none" }} state={{outfitId:0}}>
        <button id="registerOutfitBtn" className="centerLeftRight">
          착장 기록하기
        </button>
      </Link>
      <div style={{ marginBottom: "10px" }}>
        비슷한 체감온도에서 입었던 옷이에요
      </div>
      {fetchOutfitList.length > 0 ? (
        fetchOutfitList.map((element) => (
          <Link to={`/outfitlist/${element.outfitId}`}>
            <Outfit element={element} />
          </Link>
        ))
      ) : (
        <div style={{ marginTop: "20px", fontSize: "20px" }}>기록이 없어요</div>
      )}
      <BottomNav selectedNav="home" />
    </div>
  );
};

export default Home;

type WBProps = {
  fetchLocationInfo: string;
};
function WeatherBox({fetchLocationInfo}:WBProps) {
  const [errorMsg, setErrorMsg] = useState();
  const [skyCondition, setSkyCondition] = useState(0);
  const [highTemp, setHighTemp] = useState(0);
  const [lowTemp, setLowTemp] = useState(0);
  const [highWc, setHighWc] = useState(0);
  const [lowWc, setLowWc] = useState(0);
  const [weatherGraphInfoList, setWeatherGraphInfoList] = useState([
    {
      time: 0,
      temp: 0,
      skyCondition: 0,
    },
  ]);
  useEffect(() => {
    fetch("http://43.200.138.39:8080/home?memberId=1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setWeatherGraphInfoList(res.weatherGraphInfoList);
        setSkyCondition(res.skyCondition);
        setHighTemp(res.highTemp);
        setLowTemp(res.lowTemp);
        setHighWc(res.highWc);
        setLowWc(res.lowWc);
      })
      .catch((error) => setErrorMsg(error.message));
  }, [fetchLocationInfo]);
  return (
    <div id="WeatherBox" className="centerLeftRight">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <div id="weatherUpperWrapper">
        <div id="weatherIcon">{weatherIconList[skyCondition].tag}</div>
        <div id="weatherTextWrapper">
          <div>
            <div id="width80">{weatherIconList[skyCondition].name}</div>
            <div className="width38">{lowTemp}°</div> /{" "}
            <div className="width38">{highTemp}°</div>
          </div>
          <div>
            <div>체감</div> <div className="width38">{lowWc}°</div> /{" "}
            <div className="width38">{highWc}°</div>
          </div>
        </div>
      </div>
      <div id="weatherIndexWrapper">
        {weatherGraphInfoList.map((element) => (
          <div
            style={{ width: "30px" }}
            key={weatherGraphInfoList.indexOf(element)}
          >
            <div style={{ fontSize: "13px" }}>{element.time}시</div>
            {/* <div>{weatherIconList[element.icon].tag}</div> */}
            <div style={{ fontSize: "15px" }}>{element.temp}°</div>
          </div>
        ))}
      </div>

      <WeatherGraph weatherGraphInfoList={weatherGraphInfoList} />
    </div>
  );
}
type weatherGraphInfoList = {
  temp: number;
  time: number;
  skyCondition: number;
};
type Props = {
  weatherGraphInfoList: weatherGraphInfoList[];
};
function WeatherGraph({ weatherGraphInfoList }: Props) {
  let tempList: number[] = [];
  weatherGraphInfoList.map((element) => tempList.push(element.temp));
  const data = {
    labels: ["06시", "09시", "12시", "15시", "18시", "21시", "24시"],
    datasets: [
      {
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: tempList,
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
