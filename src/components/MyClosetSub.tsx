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
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [isReadModalOpened, setIsReadModalOpened] = useState(0);
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  const [subCategoryNameList, setSubCategoryNameList] = useState([]);
  const [clothesList, setClothesList] = useState([
    { clothesId: 0, clothesUrl: "", subCategory: "" },
  ]);
  const openFromChild = (value: number) => {
    setIsUpdateModalOpened(value);
  };
  const closeFromChild = (value: string) => {
    if (value == "c") setIsCreateModalOpened(false);
    if (value == "r") setIsReadModalOpened(0);
    if (value == "u") setIsUpdateModalOpened(0);
  };
  useEffect(() => {
    if (showHidden) {
      //숨긴옷보기
      fetch(
        `http://43.200.138.39:8080/closet/hidden?memberId=1&category=${category}`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate", // 캐시 사용하지 않도록
            Pragma: "no-cache",
            Expires: "0",
          },
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
      // 안숨긴옷 보기
      fetch(
        `http://43.200.138.39:8080/closet?memberId=1&category=${category}`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate", // 캐시 사용하지 않도록
            Pragma: "no-cache",
            Expires: "0",
          },
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
          onClick={() => setIsCreateModalOpened(true)}
        >
          +
        </button>
        {clothesList &&
          clothesList.map(
            (element) =>
              (selectedSubCate === "전체"
                ? true
                : selectedSubCate === element.subCategory) && (
                <div onClick={() => setIsReadModalOpened(element.clothesId)}>
                  <img id="clothes" src={element.clothesUrl} />
                </div>
              )
          )}
      </div>
      {isCreateModalOpened && (
        <Modal closeModal={() => setIsCreateModalOpened(false)}>
          <ClosetCreate category={category} closeFromChild={closeFromChild} />
        </Modal>
      )}
      {isReadModalOpened ? (
        <Modal closeModal={() => setIsReadModalOpened(0)}>
          <ClosetRead
            category={category}
            id={isReadModalOpened}
            closeFromChild={closeFromChild}
            openFromChild={openFromChild}
          />
        </Modal>
      ) : (
        <></>
      )}
      {isUpdateModalOpened ? (
        <Modal closeModal={() => setIsUpdateModalOpened(0)}>
          <ClosetUpdate
            category={category}
            id={isUpdateModalOpened}
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
