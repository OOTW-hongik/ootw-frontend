import "../css/ClosetCRUD.css";

import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti"
import { TfiTrash, TfiPencilAlt } from "react-icons/tfi";

import NoServerAlert from "./NoServerAlert";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

type Props = {
  id: number;
  category: string;
  closeFromChild: Function;
  openFromChild: Function;
};

function ClosetRead({ category, id, closeFromChild, openFromChild }: Props) {
  const [fetchInfo, setFetchInfo] = useState({
    clothesId: 0,
    subCategory: "string",
    clothesComment: "string",
    clothesUrl: "string",
    hidden: true,
  });
  const [errorMsg, setErrorMsg] = useState();
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  useEffect(() => {
    fetch(`https://api.ootw.store/clothes/${id}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate", // 캐시 사용하지 않도록
        Pragma: "no-cache",
        Expires: "0",
        Authorization: 'Bearer ' + localStorage.getItem("AccessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchInfo(res);
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
  }, []);

  function closetDelete() {
    fetch(
      `https://api.ootw.store/clothes/${fetchInfo.clothesId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("AccessToken"),
        },
      }
    ).catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
    window.location.reload();
  }

  return (
    <div className="UploadCloset">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      {isPopupOpened && <DeleteConfirmPopup confirmDel={closetDelete} cancelDel={()=>setIsPopupOpened(false)} />}

      <div className="inputTitle">사진</div>
      <img
        className="inputFileBtn"
        src={fetchInfo.clothesUrl}
        alt={fetchInfo.subCategory}
      />

      <div className="inputTitle">카테고리</div>

      <div id="subCategoryDropdown" className="inputBorder">
        <TiArrowSortedDown id="arrowIcon" />
        {fetchInfo.subCategory}
      </div>

      <div
        className="inputTitle"
        id="commentTitle"
      >
        한줄평
      </div>
      <div
        className="inputBorder"
        id="commentText"
      >
        {fetchInfo.clothesComment ? fetchInfo.clothesComment : "\u00A0"}
      </div>

      <TfiPencilAlt
        className="CRUDBtn"
        id="leftBtn"
        onClick={() => {
          openFromChild(id);
          console.log("수정", id);
          closeFromChild("r");
        }}
      />

      <TfiTrash
        className="CRUDBtn"
        id="rightBtn"
        onClick={()=>setIsPopupOpened(true)}
      />
    </div>
  );
}

export default ClosetRead;
