import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthLayout from "./AuthLayout";
import BeforeLogin from "./pages/BeforeLogin";
import Home from "./pages/Home";
import MyCloset from "./pages/MyCloset";
import OutfitList from "./pages/OutfitList";
import Setting from "./pages/Setting";
import RegisterOutfit from "./pages/RegisterOutfit";
import ChooseOutfit from "./pages/ChooseOutfit";
import OutfitRead from "./components/OutfitRead";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<App />} />
      <Route path={"/login"} element={<BeforeLogin />} />
      <Route element={<AuthLayout />}>
        <Route path={"/home"} element={<Home />} />
        <Route path={"/mycloset"} element={<MyCloset />} />
        <Route path={"/outfitlist"} element={<OutfitList />} />
        <Route path="/outfitlist/:outfitId" element={<OutfitRead />} />
        <Route path={"/setting"} element={<Setting />} />
        <Route path={"/registeroutfit"} element={<RegisterOutfit/>} />
        <Route path={"/registeroutfit/chooseOutfit"} element={<ChooseOutfit/>} />
        <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
