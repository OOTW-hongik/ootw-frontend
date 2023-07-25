import "../css/RegisterCategory.css";
import { ratingList } from "./reuse";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlusSmall } from "react-icons/go";

type Props = {
  title: string;
  ratingChange : Function;
};
function RegisterCategory({ title, ratingChange }: Props) {
  const array: number[] = [0, 1, 2, 3, 4];
  const [rating, setRating] = useState<number>(2);
  const titleArr = ["아우터","상의","하의","기타"];
  useEffect(() => {
    ratingChange(titleArr.indexOf(title), rating);
  }, [rating]);
  return (
    <div className="RegisterCategory centerLeftRight">
      <div className="ratingWrapper">
        <div className="title">{title}</div>
        <div className={"ratingText" + ratingList[rating].cssName}>
          {ratingList[rating].text}
        </div>

        {array.map((element) => (
          <div
            className={
              "ratingBtn" +
              (rating === element ? ratingList[rating].cssName : "")
            }
            key={array.indexOf(element)}
            onClick={() => setRating(element)}
          />
        ))}
      </div>

      <div className="col4GridContainer">
        <div className="centerLeftRight">
          <Link to="/registeroutfit/chooseOutfit" state={title}>
            <GoPlusSmall />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterCategory;
