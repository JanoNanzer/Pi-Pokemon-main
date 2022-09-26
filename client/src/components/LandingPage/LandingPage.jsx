import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1 className="titleLanding">Landing PokéDex</h1>
      <Link to="/home">
        <a href="#" class="animated-button1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Gotta Catch 'Em All
        </a>
      </Link>
    </div>
  );
};

export default LandingPage;
