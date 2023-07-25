import "../css/ClosetCRUD.css";
import {
  outerSubCategoryList,
  topSubCategoryList,
  bottomSubCategoryList,
} from "./reuse";
import { SetStateAction, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import Dropdown from "../components/Dropdown";
import { TfiSave } from "react-icons/tfi";

type Props = {
  category: string;
  changeFromChild: Function;
};

function ClosetCreate({ category, changeFromChild }: Props) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(category);
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [inputtedPhoto, setInputtedPhoto] = useState<FileList | null>();
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
  const photoChange = (e: React.ChangeEvent<HTMLInputElement>) => {   
    setInputtedPhoto(e.target.files);
    setSelectedSubCategory(selectedList[0]);
    // console.log(e.target.files);
  };

  function upload() {
    if (inputtedPhoto) {
      let formData = new FormData();

      formData.append("clothesPhoto", inputtedPhoto[0]);
      formData.append(
        "clothesRequest",
        new Blob(
          [
            JSON.stringify({
              memberId: 1,
              category: category,
              subCategory: selectedSubCategory,
              clothesPhoto: inputtedPhoto,
              clothesComment: inputtedComment,
              hidden: false,
            }),
          ],
          { type: "application/json" }
        )
      );
      console.log(formData);
      fetch(`http://43.200.138.39:8080/clothes`, {
        method: "POST",
        body: formData,
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
                <Dropdown
                closeDropdown={() => setIsDropdownOpened(false)}
                selectResult={(value: string) => setSelectedSubCategory(value)}
                dropList={selectedList}
                selectedList={selectedList.map((element: string) =>
                  Boolean(selectedSubCategory === element)
                )}
              />
        // <div className="dropdown">
          
        //   {selectedList.map((element: any) => (
        //     <div
        //       className="dropdownOption"
        //       id="subcateDropdownOption"
        //       key={element.id}
        //       onClick={() => {
        //         setSelectedSubCategory(element.subCategoryName);
        //         setIsDropdownOpened(false);
        //       }}
        //     >
        //       {element.subCategoryName}
        //     </div>
        //   ))}
        // </div>
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

      <TfiSave className="CRUDBtn" id="rightBtn" size={25} onClick={upload} />
    </div>
  );
}

export default ClosetCreate;
