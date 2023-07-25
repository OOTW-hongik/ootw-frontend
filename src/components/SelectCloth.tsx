import React, { useState, useEffect } from "react";
import "../css/MyClosetSub.css";
import Modal from "./Modal";
import ClosetCreate from "./ClosetCreate";
import NoServerAlert from "./NoServerAlert";
import ClosetRead from "./ClosetRead";

type Props = {
  category: string;
};
const SelectCloth = ({ category }: Props) => {
  const [selectedSubCate, setSelectedSubCate] = useState("전체");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSelected, setIsSelected] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  const [subCategoryNameList, setSubCategoryNameList] = useState([]);
  const [clothesList, setClothesList] = useState([
    { clothesId: 0, clothesUrl: "", subCategory: "" },
  ]);
  const changeFromChild = (value: boolean) => {
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
      })
      .catch((error) => setErrorMsg(error.message));
  }, [category]);

  return (
    <div>
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <div className="subCategoryWrapper">
        <div
          className={
            selectedSubCate === "전체"
              ? "subCategory after"
              : "subCategory before"
          }
          title="전체"
          onClick={() => setSelectedSubCate("전체")}
        >
          전체
        </div>
        {subCategoryNameList &&
          subCategoryNameList.map((element) => (
            <div
              className={
                selectedSubCate === element
                  ? "subCategory after"
                  : "subCategory before"
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
        {clothesList &&
          clothesList.map((element) =>
            selectedSubCate === "전체" ? (
              <div onClick={() => setIsSelected(element.clothesId)}>
                <img
                  id="clothes"
                  className={
                    element.clothesId === isSelected ? "selectedCloth" : ""
                  }
                  src={element.clothesUrl}
                />
              </div>
            ) : (
              selectedSubCate === element.subCategory && (
                <div onClick={() => setIsSelected(element.clothesId)}>
                  <img
                    id="clothes"
                    className={
                      element.clothesId === isSelected ? "selectedCloth" : ""
                    }
                    src={element.clothesUrl}
                  />
                </div>
              )
            )
          )}
      </div>
      {isModalOpened && (
        <Modal closeModal={() => setIsModalOpened(false)}>
          <ClosetCreate category={category} changeFromChild={changeFromChild} />
        </Modal>
      )}
    </div>
  );
};

export default SelectCloth;
