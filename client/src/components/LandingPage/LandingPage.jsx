import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../actions";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

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
