import "../css/UploadCloset.css";
import {
  outerSubCategoryList,
  topSubCategoryList,
  bottomSubCategoryList,
} from "./reuse";
import { SetStateAction, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

import { TfiSave } from "react-icons/tfi";

type Props = {
  category: string;
  changeFromChild: Function;
};

function UploadCloset({ category, changeFromChild }: Props) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(category);
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [inputtedPhoto, setInputtedPhoto] = useState("");
  const [inputtedComment, setInputtedComment] = useState("");

  let selectedList = outerSubCategoryList;
  switch (category) {
    case "아우터":
      selectedList = outerSubCategoryList;
      break;
    case "상의":
      selectedList = topSubCategoryList;
      break;
    case "하의":
      selectedList = bottomSubCategoryList;
  }
  const commentChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputtedComment(e.target.value);
  };
  const photoChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputtedPhoto(e.target.value);
    setSelectedSubCategory(selectedList[0].subCategoryName);
  };

  function upload() {
    if (inputtedPhoto) {
      fetch(`http://43.200.138.39:8080/clothes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: 1,
          category: category,
          subCategory: selectedSubCategory,
          clothesPhoto: inputtedPhoto,
          clothesComment: inputtedComment,
          hidden: false,
        }),
      });
      changeFromChild(false);      
      window.location.reload();
    } else {
      alert("사진 필수!");
    }
  }

  return (
    <div className="UploadCloset">
      <div className="inputTitle">사진</div>
      <label htmlFor="inputFile">
        <div className="inputFileBtn inputBorder">
          <IoImagesOutline size={"50px"} />
        </div>
      </label>
      <input
        type="file"
        id="inputFile"
        accept="image/*"
        onChange={photoChange}
      />

      <div className="inputTitle">카테고리</div>
      {category === "기타" ? (
        <div id="subCategoryDropdown" className="inputBorder disabled">
          <TiArrowSortedDown size={"20px"} style={{ margin: "13px" }} />
          {selectedSubCategory}
        </div>
      ) : (
        <div
          id="subCategoryDropdown"
          className="inputBorder"
          onClick={() => {
            setIsDropdownOpened(!isDropdownOpened);
          }}
        >
          <TiArrowSortedDown size={"20px"} style={{ margin: "13px" }} />
          {selectedSubCategory}
        </div>
      )}
      {isDropdownOpened && (
        <div className="dropdown">
          {selectedList.map((element: any) => (
            <div
              className="dropdownOption"
              id="subcateDropdownOption"
              key={element.id}
              onClick={() => {
                setSelectedSubCategory(element.subCategoryName);
                setIsDropdownOpened(false);
              }}
            >
              {element.subCategoryName}
            </div>
          ))}
        </div>
      )}

      <div
        className="inputTitle"
        style={{
          marginTop: "20px",
        }}
      >
        한줄평
      </div>
      <input
        type="text"
        className="inputBorder"
        placeholder="한줄평을 입력해보세요."
        onChange={commentChange}
      />

      <TfiSave id="saveBtn" size={25} onClick={upload} />
    </div>
  );
}

export default UploadCloset;
