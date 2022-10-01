import React from "react";
import "./Paginado.css";

const Paginado = ({ pokePerPage, allPokemons, paginado, page, setPage }) => {
  const pageNumbers = []; // arr with all pages numbers
  for (let i = 1; i <= Math.ceil(allPokemons / pokePerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (page === pageNumbers.length) return;
    else return setPage(parseInt(page) + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    else return setPage(parseInt(page) - 1);
  };

  return (
    <nav className="navPag">
      <ul className="ulPag">
        {pageNumbers.length !== 0 ? (
          <li onClick={prevPage} className={"arrowBack"}>
            ➔
          </li>
        ) : null}

        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              key={number}
              className={number === page ? "listItemSelected" : "listItem"}
              onClick={() => paginado(number)}
            >
              <a className="pageNumber">{number}</a>
            </li>
          ))}
        {pageNumbers.length !== 0 ? (
          <li onClick={nextPage} className={"listItem"}>
            ➔
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Paginado;
