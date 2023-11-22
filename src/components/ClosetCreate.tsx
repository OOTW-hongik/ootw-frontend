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
  const [inputtedPhoto, setInputtedPhoto] = useState<FormDataEntryValue>();
  const [previewURL, setPreviewURL] = useState<string>();
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
      switch (category) {
        case "아우터":
          formData.append("category", "outer");
          break;
        case "상의":
          formData.append("category", "top");
          break;
        case "하의":
          formData.append("category", "bottom");
          break;
        case "기타":
          formData.append("category", "etc");
      }

      fetch(`https://ai.ootw.store/remove_background`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
        body: formData,
      })
        .then((res) => res.formData())
        .then((res) => {
          const imageFile = res.get("image"); // AI서버에서 받아온 이미지 파일 객체
          if (imageFile !== null && imageFile instanceof Blob) {
            setInputtedPhoto(imageFile);
            const imageBlobUrl = URL.createObjectURL(imageFile);
            setPreviewURL(imageBlobUrl);
          }
          const fileEntryValue = res.get("ClothClass");
          if (fileEntryValue instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const contents = e.target?.result;
              setSelectedSubCategory(String(contents)); // AI서버에서 받아온 classification 결과값
              console.log(String(contents));
            };
            reader.readAsText(fileEntryValue); // 파일을 읽어옴
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error.status === 401) {
            localStorage.removeItem("AccessToken");
            window.location.reload();
          }
          setErrorMsg(error.message);
        });
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
              category: category,
              subCategory: selectedSubCategory,
              clothesComment: inputtedComment,
              hidden: inputtedHidden,
            }),
          ],
          { type: "application/json" }
        )
      );
      console.log(formData);
      fetch(`https://api.ootw.store/clothes`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
        body: formData,
      })
        .then(() => {
          closeFromChild("c");
          window.location.reload();
        })
        .catch((error) => {
          if (error.status === 401) {
            localStorage.removeItem("AccessToken");
            window.location.reload();
          }
          window.alert(error.message);
        });
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
            <IoImagesOutline id="galleryIcon" />
          </div>
        </label>
        <input
          type="file"
          id="inputFile"
          accept="image/*"
          onChange={photoChange}
        />
        {previewURL && (
          // 넣은 이미지가 있으면
          <img
            className="inputFileBtn"
            src={previewURL}
            alt={selectedSubCategory}
          />
        )}
      </div>
      <div className="inputTitle">카테고리</div>
      {category === "기타" ? (
        <div id="subCategoryDropdown" className="inputBorder disabled">
          <TiArrowSortedDown id="arrowIcon" />
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
          <TiArrowSortedDown id="arrowIcon" />
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

      <div className="inputTitle" id="commentTitle">
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
          onClick={() => setInputtedHidden(false)}
        />
      ) : (
        <AiOutlineEye
          className="CRUDBtn"
          id="leftBtn"
          onClick={() => setInputtedHidden(true)}
        />
      )}

      <TfiSave className="CRUDBtn" id="rightBtn" onClick={upload} />
    </div>
  );
}

export default ClosetCreate;
