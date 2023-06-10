import React from "react";
import BottomNav from "../components/BottomNav";
// import { Link } from "react-router-dom";

const Setting = () => {
  const logout=()=>{
    localStorage.removeItem("logintoken");
    window.location.reload();
  }
  const styleObj = {
    width: "150px",
    height: "60px",
    marginTop: "150px",
    marginBottom: "100px",
    backgroundColor: "white",
    border: "1px solid gray",
    borderRadius: "20px",
    fontSize: "20px",
  }
  return (
    <div className="Setting mobileWeb">
      <div>&nbsp;</div>

      <button className="centerLeftRight" style={styleObj} onClick={logout}>로그아웃</button>

      <p>홍익대학교 2023 졸업프로젝트</p>
      <br />

      <p>장우석(BE)</p>
      <p>jjang9877@gmail.com</p>
      <br />

      <p>권재현(AI, BE) </p>
      <p>rnjswogus9898@naver.com</p>
      <br />

      <p>유채연(FE)</p>
      <p>u_chaen@naver.com</p>

      <BottomNav selectedNav="setting"/>
    </div>
  );
};

export default Setting;