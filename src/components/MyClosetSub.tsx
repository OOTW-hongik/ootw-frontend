import React, { useState, useEffect } from "react";
import "../css/MyClosetSub.css";
import Modal from "./Modal";
import UploadCloset from "./UploadCloset";
type Props = {
  category: string;
};
const MyClosetSub = ({ category }: Props) => {
  const [selectedSubCate, setSelectedSubCate] = useState("전체");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [subCategoryNameList, setSubCategoryNameList] = useState([]);
  const [clothesList, setClothesList] = useState([{"clothesId":0, "clothesUrl": "string"},]);
  const changeFromChild = (value:boolean) => {
    setIsModalOpened(value);
};
  useEffect(() => {
    fetch(`http://43.200.138.39:8080/closet?memberId=1&category=${category}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setSubCategoryNameList(res.subCategoryName);
        setClothesList(res.clothesList); 
        setSelectedSubCate("전체");
      });
  }, [category]);

  return (
    <div>
      <div className="subCategoryWrapper">
        <div
          id={
            selectedSubCate === "전체" ? "selectedSubCategory" : "subCategory"
          }
          title="전체"
          onClick={() => setSelectedSubCate("전체")}
        >
          전체
        </div>
        {subCategoryNameList && subCategoryNameList.map((element) => (
          <div
            id={
              selectedSubCate === element
                ? "selectedSubCategory"
                : "subCategory"
            }
            title={element}
            onClick={() => setSelectedSubCate(element)}
          >
            {element}
          </div>
        ))}
      </div>
      <div className="col4GridContainer">
        <button
          className="registerClosetBtn centerLeftRight"
          onClick={() => setIsModalOpened(true)}
        >
          +
        </button>
        {clothesList && clothesList.map((element) => (
          <div>
            {element.clothesId}
          </div>
        ))}
      </div>
      {isModalOpened && (
        <Modal closeModal={() => setIsModalOpened(false)}>
          <UploadCloset category={category} changeFromChild={changeFromChild}/>
        </Modal>
      )}
    </div>
  );
};

export default MyClosetSub;
