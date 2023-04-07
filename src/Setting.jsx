import React from "react";

const Setting = () => {
    const styleObj = {
        width : "150px",
        height: "60px",
		margin:"150px 0", 
		backgroundColor: "white",
        border: "1px solid gray",
        borderRadius: "20px",
        fontSize:"20px"
	}
  return (
    <div className="Setting mobileWeb">

        <button style={styleObj}>로그아웃</button>

        <p>홍익대학교 2023 졸업프로젝트</p>
        <br/>

        <p>장우석(BE)</p>
        <p>jjang9877@naver.com</p>
        <br/>

        <p>권재현(AI, BE) </p>
        <p>rnjswogus9898@naver.com</p>
        <br/>

        <p>유채연(FE)</p>
        <p>u_chaen@naver.com</p>
    </div>
  );
};

export default Setting;