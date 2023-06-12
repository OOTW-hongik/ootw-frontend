import React from "react";
import { useNavigate } from "react-router-dom";

import KakaoLogin from "react-kakao-login";

const BeforeLogin = () => {
  const navigate = useNavigate();

  const kakaoClientId = "83db3e84d941e4a5914e5ec9463b079b";
  const kakaoOnSuccess = async (data) => {
    console.log(data);
    const idToken = data.response.access_token; // 백엔드로 전달 -> 백:유저정보를 조회하여 db에 저장
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <div className="mobileWeb">
      <h1 style={{ paddingTop: "200px" }}>OOTW</h1>

      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        render={({ onClick }) => (
          <img
            className="centerLeftRight"
            src="img/kakao_login_medium_wide.png"
            alt="카카오로그인"
            style={{ display: "flex" }}
            onClick={(e) => {
              e.preventDefault();
              localStorage.setItem("logintoken","1");
              navigate("/home");
              onClick();
            }}
          />
        )}
      />
    </div>
  );
};

export default BeforeLogin;
