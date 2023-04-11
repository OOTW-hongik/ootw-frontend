import React, { useState } from "react";
import "./App.css";
import BottomNav from "./BottomNav";
import Main from "./Main";
import MyCloset from "./MyCloset";
import OutfitList from "./OutfitList";
import Setting from "./Setting";

function App() {
  const [selectedNav, setSelectedNav] = useState("main");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* 자식인 BottomNav와 BeforeLogin이 부모인 App의 state를 변경할수있게하는 함수 */
  const getSelectedNav = (navName) => {
    setSelectedNav(navName);
  };
  const getIsLoggedIn = (bool) => {
    setIsLoggedIn(bool);
  };
  
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <BottomNav
            getSelectedNav={getSelectedNav}
            selectedNav={selectedNav}
          />
          {
            {
              main: <Main />,
              mycloset: <MyCloset />,
              outfitlist: <OutfitList />,
              setting: <Setting getIsLoggedIn={getIsLoggedIn} />,
            }[selectedNav]
          }
        </div>
      ) : (
        <BeforeLogin getIsLoggedIn={getIsLoggedIn} />
      )}
    </div>
  );
}

const BeforeLogin = (props) => {
  const sendisLoggedIn = (bool) => {
    props.getIsLoggedIn(bool);
  };
  return (
    <div className="mobileWeb">
      <h1>OOTW</h1>
      <button onClick={() => sendisLoggedIn(true)}>로그인하기</button>
    </div>
  );
};

export default App;
