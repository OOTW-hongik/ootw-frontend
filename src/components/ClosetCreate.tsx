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
import NoServerAlert from "./NoServerAlert";
import Loading from "./Loading";
import { TfiSave } from "react-icons/tfi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  category: string;
  closeFromChild: Function;
};

function ClosetCreate({ category, closeFromChild }: Props) {
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>(category);
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [inputtedPhoto, setInputtedPhoto] =
    useState<FormDataEntryValue | null>();
  const [inputtedComment, setInputtedComment] = useState("");
  const [inputtedHidden, setInputtedHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

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
    let pht = e.target.files;
    if (pht) {
      setLoading(true);
      let formData = new FormData();

      formData.append("image", pht[0]);
      fetch(`http://43.202.82.91/remove_background`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.formData())
        .then((res) => {
          setInputtedPhoto(res.get("image")); // AI서버에서 받아온 이미지
          console.log(res.get("image"));
          console.log(res.get("ClothClass"));
          const fileEntryValue = res.get("ClothClass");
          if (fileEntryValue instanceof File) {
            console.log("if내부");
            const reader = new FileReader();
            reader.onload = (e) => {
              const contents = e.target?.result;

              console.log("onload내부");
              setSelectedSubCategory(String(contents)); // AI서버에서 받아온 classification 결과값
              console.log(String(contents));
            };
          }
          setLoading(false);
        })
        .catch((error) => setErrorMsg(error.message));
    }
  };

  function upload() {
    if (inputtedPhoto) {
      let formData = new FormData();

      formData.append("clothesPhoto", inputtedPhoto);
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
              hidden: inputtedHidden,
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
      closeFromChild("m");
      window.location.reload();
    } else {
      alert("사진 필수!");
    }
  }

  return (
    <div className="UploadCloset">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      {loading && <Loading />}
      <div className="inputTitle">사진</div>
      <div id="photoWrapper">
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
        {inputtedPhoto && (
          // 넣은 이미지가 있으면
          <img
            className="inputFileBtn"
            src={String(inputtedPhoto)}
            alt={selectedSubCategory}
          />
        )}
      </div>
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
      {inputtedHidden ? (
        <AiOutlineEyeInvisible
          className="CRUDBtn"
          id="leftBtn"
          size={25}
          onClick={() => setInputtedHidden(false)}
        />
      ) : (
        <AiOutlineEye
          className="CRUDBtn"
          id="leftBtn"
          size={25}
          onClick={() => setInputtedHidden(true)}
        />
      )}

      <TfiSave className="CRUDBtn" id="rightBtn" size={25} onClick={upload} />
    </div>
  );
}

export default ClosetCreate;
