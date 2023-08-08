import React, { useState, useEffect } from "react";
import "../css/MyCloset.css";
import Modal from "./Modal";
import ClosetCreate from "./ClosetCreate";
import NoServerAlert from "../components/NoServerAlert";
import ClosetRead from "./ClosetRead";

import ClosetUpdate from "./ClosetUpdate";

type Props = {
  category: string;
  showHidden: boolean;
};
const MyClosetSub = ({ category, showHidden }: Props) => {
  const [selectedSubCate, setSelectedSubCate] = useState("전체");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDetailOpened, setIsDetailOpened] = useState(0);
  const [isUpdateOpened, setIsUpdateOpened] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  const [subCategoryNameList, setSubCategoryNameList] = useState([]);
  const [clothesList, setClothesList] = useState([
    { clothesId: 0, clothesUrl: "", subCategory: "" },
  ]);
  const openFromChild = (value: number) => {
    setIsUpdateOpened(value);
  };
  const closeFromChild = (value: string) => {
    if (value == "m") setIsModalOpened(false);
    if (value == "d") setIsDetailOpened(0);
    if (value == "u") setIsUpdateOpened(0);
  };
  useEffect(() => {
    if (showHidden) {
      fetch(
        `http://43.200.138.39:8080/closet/hidden?memberId=1&category=${category}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setSubCategoryNameList(res.subCategoryName);
          setClothesList(res.clothesList);
          setSelectedSubCate("전체");
        })
        .catch((error) => setErrorMsg(error.message));
    } else {
      fetch(
        `http://43.200.138.39:8080/closet?memberId=1&category=${category}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setSubCategoryNameList(res.subCategoryName);
          setClothesList(res.clothesList);
          setSelectedSubCate("전체");
        })
        .catch((error) => setErrorMsg(error.message));
    }
  }, [category, showHidden]);

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
          clothesList.map(
            (element) =>
              (selectedSubCate === "전체"
                ? true
                : selectedSubCate === element.subCategory) && (
                <div onClick={() => setIsDetailOpened(element.clothesId)}>
                  <img id="clothes" src={element.clothesUrl} />
                </div>
              )
          )}
      </div>
      {isModalOpened && (
        <Modal closeModal={() => setIsModalOpened(false)}>
          <ClosetCreate category={category} closeFromChild={closeFromChild} />
        </Modal>
      )}
      {isDetailOpened ? (
        <Modal closeModal={() => setIsDetailOpened(0)}>
          <ClosetRead
            category={category}
            id={isDetailOpened}
            closeFromChild={closeFromChild}
            openFromChild={openFromChild}
          />
        </Modal>
      ) : (
        <></>
      )}
      {isUpdateOpened ? (
        <Modal closeModal={() => setIsUpdateOpened(0)}>
          <ClosetUpdate
            category={category}
            id={isUpdateOpened}
            closeFromChild={closeFromChild}
          />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyClosetSub;
