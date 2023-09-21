import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const KakaoRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOAuthKakao = (code: string) => {
    // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
    fetch(`https://api.ootw.store/oauth/login/kakao?code=${code}`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("AccessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // alert("로그인 성공. JWT: " + res.jwt); 

        localStorage.setItem("AccessToken", res.jwt);
        navigate("/home");
      })
      .catch((error) => {
        alert("로그인 실패. Error: " + error);
        navigate("/login");
      });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      // alert("CODE = " + code);
      handleOAuthKakao(code);
    }
  }, [location]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default KakaoRedirectPage;
