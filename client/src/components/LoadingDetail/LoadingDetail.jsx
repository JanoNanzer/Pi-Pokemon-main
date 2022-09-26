import React from "react";
import "./LoadingDetail.css";
import Pan from "../PokemonImages/Pan.gif";

const LoadingDetail = () => {
  return (
    <div className="loadingDetail">
      <h1 className="loadingTitleDetail">LOADING...</h1>
      <img src={Pan} className="squirtleDetail" />
    </div>
  );
};

export default LoadingDetail;
