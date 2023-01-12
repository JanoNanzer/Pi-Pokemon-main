import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import gitHub from "../PokemonImages/pnggitHub.png";
import linkedin from "../PokemonImages/png-linkedin.png";

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
      <div className="divTitle">
        <h1 className="titleLanding">PokéDex</h1>
        <p>
          Welcome to PokéDex App. This is a single page aplication where you can
          see a lot of pokemons and create your own!!
        </p>
      </div>
      <div>
        <Link to="/home">
          <a href="#" class="animated-button1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Gotta Catch 'Em All
            <p>{"[ Home ]"}</p>
          </a>
        </Link>
      </div>
      <div className="divAbout">
        <p className="developed">Developed by Jano Nanzer</p>
        <div className="iconsContainer">
          <a
            href="https://www.linkedin.com/in/janonanzer/"
            target="_blank"
          >
            <img src={linkedin} alt="LinkedIn Link" className="iconsImage"/>
          </a>
          <a href="https://github.com/JanoNanzer" target="_blank">
            <img src={gitHub} alt="GitHub Link" className="iconsImage"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
