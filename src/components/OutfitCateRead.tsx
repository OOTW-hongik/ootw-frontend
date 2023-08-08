import "../css/OutfitCateCRUD.css";
import { ratingList } from "./reuse";
import { useState } from "react";

type Props = {
  title: string;
  clothes: Array<{ clothesUrl: string; clothesId: number }>;
  rating: number;
};
function OutfitCateRead({ title, clothes, rating }: Props) {

  return (
    <div className="RegisterCategory centerLeftRight">
      <div className="ratingWrapper">
        <div className="title">{title}</div>
        <div className={"ratingText" + ratingList[rating].cssName}>
          {ratingList[rating].text}
        </div>
      </div>

      <div className="col4GridContainer">
        {clothes.map((element) => (
          <div>
            <img
              id="clothes"
              src={element.clothesUrl}
              className="centerLeftRight"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OutfitCateRead;
