import React from "react";

const BeforeLogin = () => {
  const loginHandler = () => {
    window.location.href = 'https://api.ootw.store/oauth/kakao';
  };

  return (
    <div >
      <h1 id="OOTW">OOTW</h1>

      <img
        className="centerLeftRight"
        id="loginBtn"
        src="img/kakao_login_medium_wide.png"
        alt="카카오로그인"
        onClick={() => {
          loginHandler();
        }
        }
      />
    </div>
  );
};

export default BeforeLogin;
