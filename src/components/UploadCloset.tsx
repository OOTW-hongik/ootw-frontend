import "../css/UploadCloset.css";
import { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

type Props = {
  category: string;
};

function UploadCloset({ category }: Props) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(category);
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const outerSubCategoryList = [
    { subCategoryName: "후드집업" },
    { subCategoryName: "자켓" },
    { subCategoryName: "가디건" },
    { subCategoryName: "코트" },
    { subCategoryName: "패딩" },
  ];
  const topSubCategoryList = [
    { subCategoryName: "반팔티" },
    { subCategoryName: "긴팔티" },
    { subCategoryName: "셔츠" },
    { subCategoryName: "후드티" },
    { subCategoryName: "원피스" },
  ];
  const bottomSubCategoryList = [
    { subCategoryName: "긴바지" },
    { subCategoryName: "반바지" },
    { subCategoryName: "치마" },
  ];
  const etcSubCategoryList = [{ subCategoryName: "기타" }];

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
      break;
    case "기타":
      selectedList = etcSubCategoryList;
  }

  return (
    <div className="UploadCloset">
      <div className="inputTitle">사진</div>
      <label htmlFor="inputFile">
        <div className="inputFileBtn inputBorder">
          <IoImagesOutline size={"50px"} />
        </div>
      </label>
      <input type="file" id="inputFile" accept="image/*" />

      <div className="inputTitle">카테고리</div>
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
      {isDropdownOpened && (
        <div className="dropdown">
          {selectedList.map((element: any) => (
            <div
              className="dropdownOption"
              id="subcateDropdownOption"
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

      <div className="inputTitle">한줄평</div>
      <input
        type="text"
        className="inputBorder"
        placeholder="한줄평을 입력해보세요."
      />
    </div>
  );
}

export default UploadCloset;
