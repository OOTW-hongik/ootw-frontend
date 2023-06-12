import "../css/RegisterCategory.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoPlusSmall } from "react-icons/go";
type Props = {
  title: string;
};
function RegisterCategory({ title }: Props) {
  const ratingList = [
    {
      cssName: " active1",
      text: "추움",
    },
    {
      cssName: " active2",
      text: "시원",
    },
    {
      cssName: " active3",
      text: "적당",
    },
    {
      cssName: " active4",
      text: "따뜻",
    },
    {
      cssName: " active5",
      text: "더움",
    },
  ];

  const array: number[] = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(3);
  return (
    <div className="RegisterCategory centerLeftRight">
      <div className="ratingWrapper">
        <div className="title">{title}</div>
        <div className={"ratingText" + ratingList[rating - 1].cssName}>
          {ratingList[rating - 1].text}
        </div>

        {array.map((arrayindex) => (
          <div
            className={
              "ratingBtn" +
              (rating === arrayindex ? ratingList[rating - 1].cssName : "")
            }
            onClick={() => setRating(arrayindex)}
          />
        ))}
      </div>

      <div className="col4GridContainer">
        <div className="centerLeftRight">
          <Link to="/registeroutfit/chooseOutfit" state={title}>
            <GoPlusSmall />
          </Link>
        </div>
        <div>옷1</div>
        <div>옷2</div>
        <div>옷3</div>
        <div>옷4</div>
      </div>
    </div>
  );
}

export default RegisterCategory;
