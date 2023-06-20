import React from "react";
import { Link } from "react-router-dom";
import "../css/Outfit.css";
import MiniWeather from "./MiniWeather";
import { ratingList } from "./reuse";

type Props = {
  element: {
    outfitId: number;
    outfitDate: string;
    skyCondition: number;
    highWc: number;
    lowWc: number;
    highTemp: number;
    lowTemp: number;
    outerRating: number;
    topRating: number;
    bottomRating: number;
    outerUrl: string;
    topUrl: string;
    bottomUrl: string;
    manyOuter: boolean;
    manyTop: boolean;
    manyBottom: boolean;
  };
};

const Outfit = ({ element }: Props) => {
  return (
    <div id="Outfit" className="centerLeftRight">
      <div id="outfitLeftWrapper">
        <div>{element.outfitDate}</div>
        <MiniWeather
          skyCondition={element.skyCondition}
          highWc={element.highWc}
          lowWc={element.lowWc}
          highTemp={element.highTemp}
          lowTemp={element.lowTemp}
        />
      </div>
      <div id="outfitRightWrapper" className="flex">
        <div>
          <div className="mainClothesPhoto" >{element.outerUrl}</div>
          <div
            className={"ratingText" + ratingList[element.outerRating].cssName}
          >
            {ratingList[element.outerRating].text}
          </div>
        </div>
        <div>
          <div className="mainClothesPhoto" >{element.topUrl}</div>
          <div className={"ratingText" + ratingList[element.topRating].cssName}>
            {ratingList[element.topRating].text}
          </div>
        </div>
        <div>
          <div className="mainClothesPhoto" >{element.bottomUrl}</div>
          <div
            className={"ratingText" + ratingList[element.bottomRating].cssName}
          >
            {ratingList[element.bottomRating].text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outfit;
