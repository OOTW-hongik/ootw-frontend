import React from "react";
import './BottomNav.css';
import {
  IoHomeOutline, IoHome,
  IoShirtOutline, IoShirt,
  IoListOutline, IoList,
  IoSettingsOutline, IoSettings
} from "react-icons/io5";


const BottomNav = (props) => {
  const sendSelectedNav = (navName) => {
    props.getSelectedNav(navName);
  }
  return (
    <nav className="wrapper">
      <div onClick={() => sendSelectedNav("main")}>
        {props.selectedNav === "main" ? (
          <IoHome className="navIcon" />
        ) : (
          <IoHomeOutline className="navIcon" />
        )}
      </div>
      <div onClick={() => sendSelectedNav("mycloset")}>
        {props.selectedNav === "mycloset" ? (
          <IoShirt className="navIcon" />
        ) : (
          <IoShirtOutline className="navIcon" />
        )}
      </div>
      <div onClick={() => sendSelectedNav("outfitlist")}>
        {props.selectedNav === "outfitlist" ? (
          <IoList className="navIcon" />
        ) : (
          <IoListOutline className="navIcon" />
        )}
      </div>
      <div onClick={() => sendSelectedNav("setting")}>
        {props.selectedNav === "setting" ? (
          <IoSettings className="navIcon" />
        ) : (
          <IoSettingsOutline className="navIcon" />
        )}
      </div>
    </nav>
  );
};

export default BottomNav;