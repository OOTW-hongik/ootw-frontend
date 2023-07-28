import "../css/RegisterCategory.css";
import { ratingList } from "./reuse";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlusSmall } from "react-icons/go";

type Props = {
  title: string;
  ratingChange: Function;
};
function RegisterCategory({ title, ratingChange }: Props) {
  const array: number[] = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(3);
  const [selectedClothesPhoto, setSelectedClothesPhoto] = useState();
  const titleArr = ["아우터", "상의", "하의", "기타"];

  useLayoutEffect(() => {
    const ssData = sessionStorage.getItem(`inputted${title}`);
    if (ssData) {
      fetch(`http://43.200.138.39:8080/clothes?clothesId=${ssData}`)
        .then((res) => res.json())
        .then((res) => {
          setSelectedClothesPhoto(res.clothesUrl);
        });
      // .catch((error) => setErrorMsg(error.message));
    }
  }, []);

  useEffect(() => {
    ratingChange(titleArr.indexOf(title), rating);
  }, [rating]);

  useEffect(() => {
    let ssRatingInfo = sessionStorage.getItem("ratingInfo")?.split(",");
    if (ssRatingInfo) setRating(Number(ssRatingInfo[titleArr.indexOf(title)])); // 있으면
  }, []);

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
        {selectedClothesPhoto && (
          <img id="clothes" src={selectedClothesPhoto} />
        )}
      </div>
    </div>
  );
}

export default RegisterCategory;
