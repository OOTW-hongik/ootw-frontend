import "../css/OutfitCateCRUD.css";
import { ratingList } from "./reuse";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlusSmall } from "react-icons/go";
import NoServerAlert from "./NoServerAlert";

type Props = {
  title: string;
  ratingChange: Function;
  outfitId: string | number;
};
function OutfitCateCreate({ title, ratingChange, outfitId }: Props) {
  const array: number[] = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(3);
  const [selectedClothesPhoto, setSelectedClothesPhoto] = useState<string[]>(
    []
  );
  const titleArr = ["아우터", "상의", "하의", "기타"];
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    let ssRatingInfo = sessionStorage
      .getItem(`ratingInfo${outfitId}`)
      ?.split(",");
    if (ssRatingInfo) setRating(Number(ssRatingInfo[titleArr.indexOf(title)])); // 있으면

    const ssData = sessionStorage.getItem(`inputted${title}${outfitId}`);
    if (ssData) {
      ssData.split(",").map((element) => {
        fetch(`https://api.ootw.store/clothes?clothesId=${element}`)
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
    // setSelectedClothesPhoto(fetchPhotos);
  }, []);

  useEffect(() => {
    ratingChange(titleArr.indexOf(title), rating);
  }, [rating]);

  function cancelSelect(element: string) {
    // element와 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
    setSelectedClothesPhoto(
      selectedClothesPhoto.filter(
        (selectedClothesPhoto) => selectedClothesPhoto !== element
      )
    );
  }

  function changeToMain(index:number){
    let copy = [...selectedClothesPhoto];
    [copy[index], copy[0]] = [copy[0], copy[index]];
    setSelectedClothesPhoto(copy);

    let ssDataArr = sessionStorage.getItem(`inputted${title}${outfitId}`)?.split(",");;
    console.log(ssDataArr);
    if(ssDataArr){

      [ssDataArr[index], ssDataArr[0]] = [ssDataArr[0], ssDataArr[index]];
      sessionStorage.setItem(`inputted${title}${outfitId}`,String(ssDataArr));
    }
  }

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
          <Link
            to="/registeroutfit/chooseOutfit"
            state={{ category: title, outfitId: outfitId }}
          >
            <GoPlusSmall />
          </Link>
        </div>

        {selectedClothesPhoto.map((element) => (
          <div>
            <img id="clothes" src={element} />
            {selectedClothesPhoto[0] === element ? (
              <button id="mainImgBtn">대표</button>
            ):(<button id="notMainBtn" className="pointer" onClick={()=>changeToMain(selectedClothesPhoto.indexOf(element))} />)}
            <button id="xBtn" className="pointer" onClick={() => cancelSelect(element)}>
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OutfitCateCreate;
