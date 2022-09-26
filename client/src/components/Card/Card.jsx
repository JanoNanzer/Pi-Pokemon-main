import React from "react";
import "./Card.css";
import "../PokemonImages/CardsColor/CardsColor.css";
import * as tipos from "../ExportTypesImage/ExportTypesImage";

const Card = ({ name, image, types, id }) => {
  if (typeof id === "string") {
    types = types.split(", ");
  }
  return (
    <div className="cards">
      <h3 className="pokeName">{name}</h3>
      <img
        src={image}
        className="cardImage"
        alt="img"
        width="200px"
        height="250px"
      />
      <div className="divTypesCard">
        {types.map((t) => {
          return (
            <div className={`cardType`}>
              <img className={`${t.toUpperCase()}`} src={tipos[`${t}`]} />
              <div className="typesNameFather">
                <span className="typesNameChild" key={t}>
                  {t.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;

// types.toUpperCase()
