import React from "react";
import "./Paginado.css";

const Paginado = ({ pokePerPage, allPokemons, paginado,page}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="navPag">
      <ul className="ulPag">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              key={number}
              className={number === page ? "listItemSelected" :"listItem"}
              onClick={() => paginado(number)}
            >
              <a className="pageNumber">{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;
