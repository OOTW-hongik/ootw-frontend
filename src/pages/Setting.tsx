import React from "react";
import BottomNav from "../components/BottomNav";
import { useMediaQuery } from "react-responsive";

const Setting = () => {
  const logout=()=>{
    localStorage.removeItem("AccessToken");
    window.location.reload();
  }
  const isMobile = useMediaQuery({
    query: "(max-device-width:767px)",
  });
  const isPc = useMediaQuery({
    query: "(min-device-width:768px)",
  });
  const mobileStyleObj ={
    width: "375px",
    height: "150px",
    marginTop: "500px",
    marginBottom: "250px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "50px",
    fontSize: "50px",
    boxShadow: "0 5px 10px 0 rgb(0, 0, 0, 0.2)"
  }
  const pcStyleObj = {
    width: "150px",
    height: "60px",
    marginTop: "150px",
    marginBottom: "100px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "20px",
    fontSize: "20px",
    boxShadow: "0 2px 4px 0 rgb(0, 0, 0, 0.2)"
  };

  return (
    <div className="Setting mobileWeb">
      <div>&nbsp;</div>
      {isPc && <button className="centerLeftRight" style={pcStyleObj} onClick={logout}>로그아웃</button>}
      
      {isMobile && <button className="centerLeftRight" style={mobileStyleObj} onClick={logout}>로그아웃</button>}

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