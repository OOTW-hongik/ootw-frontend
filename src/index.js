import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthLayout from "./AuthLayout";
import BeforeLogin from "./BeforeLogin";
import Main from "./Main";
import MyCloset from "./MyCloset";
import OutfitList from "./OutfitList";
import Setting from "./Setting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<BeforeLogin />} />
        <Route element={<AuthLayout />}>
          <Route path={"/main"} element={<Main />} />
          <Route path={"/mycloset"} element={<MyCloset />} />
          <Route path={"/outfitlist"} element={<OutfitList />} />
          <Route path={"/setting"} element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
