import "../css/ClosetCRUD.css";
import {
  outerSubCategoryList,
  topSubCategoryList,
  bottomSubCategoryList,
} from "./reuse";
import { SetStateAction, useState, useEffect } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import Dropdown from "../components/Dropdown";
import { TfiSave } from "react-icons/tfi";

type Props = {
  id: number;
  category: string;
  closeFromChild: Function;
};

function ClosetUpdate({ category, id, closeFromChild }: Props) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    category
  );
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [inputtedPhoto, setInputtedPhoto] =
    useState<FormDataEntryValue | null>();
  const [inputtedComment, setInputtedComment] = useState("");
  const [fetchInfo, setFetchInfo] = useState({
    clothesId: 0,
    subCategory: "string",
    clothesComment: "string",
    clothesUrl: "string",
    hidden: true,
  });
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    fetch(`http://43.200.138.39:8080/clothes?clothesId=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchInfo(res);
        setSelectedSubCategory(res.subCategory);
        setInputtedComment(res.clothesComment);
      })
      .catch((error) => setErrorMsg(error.message));
  }, []);

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
      let formData = new FormData();

      formData.append("image", pht[0]);
      fetch(`http://43.202.82.91/remove_background`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.formData())
        .then((res) => {
          setInputtedPhoto(res.get("image")); // AI서버에서 받아온 이미지

          const fileEntryValue = res.get("ClothClass");
          if (fileEntryValue instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const contents = e.target?.result;
              setSelectedSubCategory(String(contents)); // AI서버에서 받아온 classification 결과값
            };
          }
        });
      // .catch((error) => setErrorMsg(error.message));
    }
  };

  function update() {
    if (inputtedPhoto || fetchInfo.clothesUrl) {
      let formData = new FormData();
      if (inputtedPhoto) {
        formData.append("clothesPhoto", inputtedPhoto);
      } else {
        formData.append("clothesPhoto", fetchInfo.clothesUrl);
      }
      formData.append(
        "clothesUpdateRequest",
        new Blob(
          [
            JSON.stringify({
              clothesId: id,
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
        method: "PUT",
        body: formData,
      });
      window.location.reload();
    } else {
      alert("사진 필수!");
    }
  }

  return (
    <div className="UploadCloset">
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
        {inputtedPhoto ? (
          // 새로넣은 이미지가 있으면 
          <img
            className="inputFileBtn"
            src={String(inputtedPhoto)}
            alt={selectedSubCategory}
          />
        ) : (
          <img
            className="inputFileBtn"
            src={fetchInfo.clothesUrl}
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
        value={inputtedComment}
        onChange={commentChange}
      />

      <TfiSave className="CRUDBtn" id="rightBtn" size={25} onClick={update} />
    </div>
  );
}

export default ClosetUpdate;
