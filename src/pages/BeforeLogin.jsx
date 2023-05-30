import React from "react";
import { useNavigate } from "react-router-dom";

const BeforeLogin = (props) => {
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("logintoken", "1");
    navigate("/home");
  };
  return (
    <div className="mobileWeb">
      <h1 style={{paddingTop:"200px"}}>OOTW</h1>
      <img
        className="centerLeftRight"
        onClick={login}
        src="img/kakao_login_medium_wide.png"
        alt="카카오로그인"
        style={{display:"flex"}}
      />
    </div>
  );
};

export default BeforeLogin;
