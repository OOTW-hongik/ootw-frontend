import React from "react";
import { Link } from "react-router-dom";
import "../css/Outfit.css";
import MiniWeather from "./MiniWeather";
import { ratingList } from "./reuse";
import {BsPlus} from "react-icons/bs";

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
        <div id="outfitDate">{element.outfitDate}</div>
        <MiniWeather
          skyCondition={element.skyCondition}
          highWc={element.highWc}
          lowWc={element.lowWc}
          highTemp={element.highTemp}
          lowTemp={element.lowTemp}
        />
      </div>
      <div id="outfitRightWrapper" className="flex">
        <div className="clothWrapper">
          {element.manyOuter && <BsPlus className="plus" />}
          <img
            className="mainClothesPhoto"
            src={element.outerUrl}
            alt="아우터"
          />
          <div
            className={"ratingText centerLeftRight" + ratingList[element.outerRating].cssName}
          >
            {ratingList[element.outerRating].text}
          </div>
        </div>
        <div className="clothWrapper">
          {element.manyTop && <BsPlus className="plus" />}
          <img className="mainClothesPhoto" src={element.topUrl} alt="상의" />
          <div className={"ratingText centerLeftRight" + ratingList[element.topRating].cssName}>
            {ratingList[element.topRating].text}
          </div>
        </div>
        <div className="clothWrapper">
          {element.manyBottom && <BsPlus className="plus" />}
          <img
            className="mainClothesPhoto"
            src={element.bottomUrl}
            alt="하의"
          />
          <div
            className={"ratingText centerLeftRight" + ratingList[element.bottomRating].cssName}
          >
            {ratingList[element.bottomRating].text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outfit;
