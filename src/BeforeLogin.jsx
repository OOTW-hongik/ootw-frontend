import React from "react";
import { useNavigate } from "react-router-dom";


const BeforeLogin = (props) => {
    const navigate = useNavigate();
    const login = () => {
        localStorage.setItem("logintoken", "1");
        navigate("/main");
    }
    return (
        <div className="mobileWeb">
            <h1>OOTW</h1>
            <button onClick={login}>로그인하기</button>
        </div>
    );
};



export default BeforeLogin;
