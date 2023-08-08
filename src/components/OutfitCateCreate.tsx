import "../css/OutfitCateCRUD.css";
import { ratingList } from "./reuse";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlusSmall } from "react-icons/go";
import NoServerAlert from "./NoServerAlert";

type Props = {
  title: string;
  ratingChange: Function;
};
function OutfitCateCreate({ title, ratingChange }: Props) {
  const array: number[] = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(3);
  const [selectedClothesPhoto, setSelectedClothesPhoto] = useState<string[]>(
    []
  );
  const titleArr = ["아우터", "상의", "하의", "기타"];
  const [errorMsg, setErrorMsg] = useState();

  useLayoutEffect(() => {
    const ssData = sessionStorage.getItem(`inputted${title}`);

    if (ssData) {
      ssData.split(",").map((element) => {
        fetch(`http://43.200.138.39:8080/clothes?clothesId=${element}`)
          .then((res) => res.json())
          .then((res) => {
            setSelectedClothesPhoto((selectedClothesPhoto) => [
              ...selectedClothesPhoto,
              res.clothesUrl,
            ]);
          })
          .catch((error) => setErrorMsg(error.message));
      });
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
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
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

        {selectedClothesPhoto.map((element) => (
          <div>
            <img id="clothes" src={element} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OutfitCateCreate;
