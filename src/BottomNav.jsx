import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";
import {
  IoHomeOutline,
  IoHome,
  IoShirtOutline,
  IoShirt,
  IoListOutline,
  IoList,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";

function BottomNav(props) {
  return (
    <nav className="wrapper">
      <div>
        <Link to="/main">
          {props.selectedNav === "main" ? (
            <IoHome className="navIcon" />
          ) : (
            <IoHomeOutline className="navIcon" />
          )}
        </Link>
      </div>
      <div>
        <Link to="/mycloset">
          {props.selectedNav === "mycloset" ? (
            <IoShirt className="navIcon" />
          ) : (
            <IoShirtOutline className="navIcon" />
          )}
        </Link>
      </div>
      <div>
        <Link to="/outfitlist">
          {props.selectedNav === "outfitlist" ? (
            <IoList className="navIcon" />
          ) : (
            <IoListOutline className="navIcon" />
          )}
        </Link>
      </div>
      <div>
        <Link to="/setting">
          {props.selectedNav === "setting" ? (
            <IoSettings className="navIcon" />
          ) : (
            <IoSettingsOutline className="navIcon" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
