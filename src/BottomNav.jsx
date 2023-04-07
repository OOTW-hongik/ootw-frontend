import React, { useState } from "react";
import './BottomNav.css';
import { IoHomeOutline, IoSettingsOutline, IoShirtOutline, IoListOutline, IoHome, IoList, IoShirt, IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);
  return (
    <nav className="wrapper">
      <div>
        <Link to="/" onClick={() => setActiveNav(1)}>
          {activeNav === 1 ? (
          <IoHome className="navIcon"/> 
          ) : (
          <IoHomeOutline className="navIcon"/>
          )}          
        </Link>
      </div>
      <div>
        <Link to="/mycloset" onClick={() => setActiveNav(2)}>
        {activeNav === 2 ? (
          <IoShirt className="navIcon"/> 
          ) : (
            <IoShirtOutline className="navIcon"/>
          )} 
          
        </Link>
      </div>
      <div>
        <Link to="/outfitlist" onClick={() => setActiveNav(3)}>
        {activeNav === 3 ? (
          <IoList className="navIcon"/> 
          ) : (
            <IoListOutline className="navIcon"/>
          )} 
          
          </Link>
      </div>
      <div>
      <Link to="/setting" onClick={() => setActiveNav(4)}>
        {activeNav === 4 ? (
          <IoSettings className="navIcon"/> 
          ) : (
            <IoSettingsOutline className="navIcon"/>
          )} 
          
          </Link>
        
      </div>
    </nav>
  );
};

export default BottomNav;