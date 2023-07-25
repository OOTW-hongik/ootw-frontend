import "../css/ClosetCRUD.css";
import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

import { TfiTrash, TfiPencilAlt } from "react-icons/tfi";
import NoServerAlert from "./NoServerAlert";

type Props = {
  id: number;
};

function ClosetRead({ id }: Props) {
  const [fetchInfo, setFetchInfo] = useState({
    id: 0,
    subcategory: "string",
    clothesComment: "string",
    photoUrl: "string",
    hidden: true,
  });
  const [errorMsg, setErrorMsg] = useState();
  useEffect(() => {
    fetch(`http://43.200.138.39:8080/test/clothes?clothesId=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchInfo(res);
      })
      .catch((error) => setErrorMsg(error.message));
  }, []);

  function ClothesDelete() {
      fetch(`http://43.200.138.39:8080/test/clothes?clothesId=${fetchInfo.id}`, {
        method: "DELETE",
      });   
  };

  return (
    <div className="UploadCloset">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <div className="inputTitle">사진</div>
      <img
        className="centerLeftRight"
        src="img/kakao_login_medium_wide.png"
        alt={fetchInfo.photoUrl}
      />

      <div className="inputTitle">카테고리</div>

      <div id="subCategoryDropdown" className="inputBorder">
        <TiArrowSortedDown size={"20px"} style={{ margin: "13px" }} />
        {fetchInfo.subcategory}
      </div>

      <div
        className="inputTitle"
        style={{
          marginTop: "20px",
        }}
      >
        한줄평
      </div>
      <div>{fetchInfo.clothesComment}</div>

      <TfiPencilAlt className="CRUDBtn" id="leftBtn" size={25} />
      <TfiTrash className="CRUDBtn" id="rightBtn" size={25} onClick={ClothesDelete}/>
    </div>
  );
}

export default ClosetRead;
