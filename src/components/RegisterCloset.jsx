import "../css/RegisterCloset.css";
import { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

function RegisterCloset(props) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    props.category
  );
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
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
  const etcSubCategoryList = [
    { subCategoryName: "기타" }
  ];

  return (
    <div className="RegisterCloset">
      <div className="inputTitle">사진</div>
      <label for="inputFile">
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
          {{
            "아우터": outerSubCategoryList,
            "상의": topSubCategoryList,
            "하의": bottomSubCategoryList,
            "기타": etcSubCategoryList,
          }[props.category].map((element) => (
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

export default RegisterCloset;
