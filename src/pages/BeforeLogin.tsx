import React from "react";

const BeforeLogin = () => {
  const loginHandler = () => {
    window.location.href = "https://api.ootw.store/oauth/kakao";
  };

  return (
    <div>
      <img
        className="centerLeftRight"
        id="biglogo"
        src="img/ootwlogo.png"
        alt="OOTW"
      />
      <img
        className="centerLeftRight"
        id="loginBtn"
        src="img/kakao_login_medium_wide.png"
        alt="카카오로그인"
        onClick={() => {
          loginHandler();
        }}
      />
    </div>
  );
};

export default BeforeLogin;
