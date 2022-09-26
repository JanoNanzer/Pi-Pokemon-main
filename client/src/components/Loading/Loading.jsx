import React from "react";
import "./Loading.css";
import Pan from "../PokemonImages/Pan.gif";

const Loading = () => {
  return (
    <div className="loading">
      <h1 className="loadingTitle">LOADING...</h1>
      <img src={Pan} className="squirtle" />
    </div>
  );
};

export default Loading;
