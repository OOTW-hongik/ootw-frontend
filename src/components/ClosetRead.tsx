import "../css/ClosetCRUD.css";
import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import Modal from "./Modal";
import { TfiTrash, TfiPencilAlt } from "react-icons/tfi";
import NoServerAlert from "./NoServerAlert";

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

  useEffect(() => {
    fetch(`http://43.200.138.39:8080/clothes?clothesId=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchInfo(res);
      })
      .catch((error) => setErrorMsg(error.message));
  }, []);

  function ClothesDelete() {
    fetch(
      `http://43.200.138.39:8080/clothes?clothesId=${fetchInfo.clothesId}`,
      {
        method: "DELETE",
      }
    );
  }

  return (
    <div className="UploadCloset">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <div className="inputTitle">사진</div>
      <img
        className="inputFileBtn"
        src={fetchInfo.clothesUrl}
        alt={fetchInfo.subCategory}
      />

      <div className="inputTitle">카테고리</div>

      <div id="subCategoryDropdown" className="inputBorder">
        <TiArrowSortedDown size={"20px"} style={{ margin: "13px" }} />
        {fetchInfo.subCategory}
      </div>

      <div
        className="inputTitle"
        style={{
          marginTop: "20px",
        }}
      >
        한줄평
      </div>
      <div
        className="inputBorder"
        style={{
          padding: "6px",
          fontSize: "15px",
        }}
      >
        {fetchInfo.clothesComment ? fetchInfo.clothesComment : '\u00A0'}
      </div>

      <TfiPencilAlt
        className="CRUDBtn"
        id="leftBtn"
        size={25}
        onClick={() => {
          openFromChild(id);
          console.log("수정", id);
          closeFromChild("d");
        }}
      />

      <TfiTrash
        className="CRUDBtn"
        id="rightBtn"
        size={25}
        // onClick={ClothesDelete}
      />
    </div>
  );
}

export default ClosetRead;
