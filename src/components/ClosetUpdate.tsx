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
import Loading from "./Loading";
import NoServerAlert from "./NoServerAlert";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  id: number;
  category: string;
  closeFromChild: Function;
};

function ClosetUpdate({ category, id, closeFromChild }: Props) {
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>(category);
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [inputtedPhoto, setInputtedPhoto] =
    useState<FormDataEntryValue | null>();
  const [previewURL, setPreviewURL] = useState<string>();
  const [inputtedComment, setInputtedComment] = useState("");
  const [inputtedHidden, setInputtedHidden] = useState(false);

  const [fetchInfo, setFetchInfo] = useState({
    clothesId: 0,
    subCategory: "string",
    clothesComment: "string",
    clothesUrl: "string",
    hidden: true,
  });
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://api.ootw.store/clothes/${id}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate", // 캐시 사용하지 않도록
        Pragma: "no-cache",
        Expires: "0",
        Authorization: "Bearer " + localStorage.getItem("AccessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchInfo(res);
        setSelectedSubCategory(res.subCategory);
        setInputtedComment(res.clothesComment);
        setInputtedHidden(res.hidden);
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
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
      setLoading(true);
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

  function update() {
    if (inputtedPhoto) {
      // 사진 수정함
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
      console.log(inputtedPhoto);
      fetch(`https://api.ootw.store/clothes/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
        body: formData,
      })
        .then(() => window.location.reload())
        .catch((error) => {
          if (error.status === 401) {
            localStorage.removeItem("AccessToken");
            window.location.reload();
          }
          window.alert(error.message);
        });
    } else {
      fetch(`https://api.ootw.store/clothes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },

        body: JSON.stringify({
          category: category,
          subCategory: selectedSubCategory,
          clothesComment: inputtedComment,
          hidden: inputtedHidden,
        }),
      });
      window.location.reload();
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
        {previewURL ? (
          // 새로넣은 이미지가 있으면
          <img
            className="inputFileBtn"
            src={previewURL}
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
        value={inputtedComment}
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
      <TfiSave className="CRUDBtn" id="rightBtn" onClick={update} />
    </div>
  );
}

export default ClosetUpdate;
