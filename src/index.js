import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import MyCloset from "./MyCloset";
import App from './App';
import BottomNav from "./BottomNav";
import OutfitList from "./OutfitList";
import Setting from "./Setting";
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    

    <BrowserRouter>
    <BottomNav />
        <Routes>
          <Route path={"/"} element={<App />}></Route>
          <Route path={"/mycloset"} element={<MyCloset />}></Route>
          <Route path={"/outfitlist"} element={<OutfitList />}></Route>
          <Route path={"/setting"} element={<Setting />}></Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
