import React from "react";
import { useNavigate } from "react-router-dom";

const BeforeLogin = () => {
  const navigate = useNavigate();
  const url = "http://43.200.138.39:8080/oauth2/authorization/kakao"
  const login = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href='http://43.200.138.39:8080/oauth2/authorization/kakao';
    // window.open(url);
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
