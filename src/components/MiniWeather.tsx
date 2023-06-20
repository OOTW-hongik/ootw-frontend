import "../css/MiniWeather.css";
import { weatherIconList } from "../components/reuse";

type Props = {
  highTemp: number;
  lowTemp: number;
  highWc: number;
  lowWc: number;
  skyCondition: number;
};

function MiniWeather({
  highTemp,
  lowTemp,
  highWc,
  lowWc,
  skyCondition,
}: Props) {
  return (
    <div id="MiniWeather">
      <div>
        <div id="miniIcon">{weatherIconList[skyCondition].tag}</div>
        <div className="width32">{lowTemp}°</div>/<div className="width32">{highTemp}°</div>
      </div>
      <div>
        <div id="chegam">체감</div>
        <div className="width32">{lowWc}°</div>/<div className="width32">{highWc}°</div>
      </div>
    </div>
  );
}

export default MiniWeather;
