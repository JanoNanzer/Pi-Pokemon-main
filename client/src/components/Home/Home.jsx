import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  getPokemonByType,
  filterCreated,
  orderByAlphabet,
  orderByAtack,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Loading from "../Loading/Loading";
import "./Home.css";
import imageError from "../PokemonImages/Mewspinning.gif";


// class Home extends Component {}
// componentDidMount(){}
// render(){}
// mapStateToProps -> traigo state
// mapDispatchToProps -> traigo la function
// connect(mapStateToProps, mapDispatchToProps)(Home) -> conecto todo

const Home = () => {
  const dispatch = useDispatch();

  // States from reducer
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const error = useSelector((state) => state.error);

  // Set local state for select values
  const [filtros, setFiltros] = useState();

  // Set local state to render when filters change
  const [orden, setOrden] = useState();

  // Set paginated
  const [page, setPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(12);
  const indexOfLastPokemon = page * pokePerPage; // index of last pokemon in page
  const indexOfFirstPokemon = indexOfLastPokemon - pokePerPage; // index of first pokemon in page
  const currentPokemons = allPokemons.slice(
    // current cuantity of pokemons per page 12-24-36
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pagNumber) => {
    setPage(pagNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  // Reload all pokemons & set page 1
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getPokemons());
    setFiltros("title");
    setPage(1);
  };

  // Filter by Types
  const handleFilterByType = (e) => {
    e.preventDefault();
    dispatch(getPokemonByType(e.target.value));
    setPage(1);
    setFiltros();
    setOrden(e.target.value);
  };

  // Filter by creation
  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setPage(1);
    setFiltros();
    setOrden(e.target.value);
  };

  // Filter by Alphabet
  const handleOrderByAlphabet = (e) => {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    setPage(1);
    setFiltros();
    setOrden(e.target.value);
  };

  // Filter by attack points
  const handleOrderByAttack = (e) => {
    e.preventDefault();
    dispatch(orderByAtack(e.target.value));
    setPage(1);
    setFiltros();
    setOrden(e.target.value);
  };

  return (
    <div className="bigHome">
      {
        <div>
          <div className="linksTop">
            <Link to={"/"} className="linkTop">
              Landing Page
            </Link>
            <h1 className="titleTop">PokéDex</h1>
            <Link to="/createPokemon" className="linkTop">
              Create Pokemon
            </Link>
          </div>

          <div className="filtrosNav">
            <select
              className="filtrosSelect"
              value={filtros}
              onChange={(e) => handleOrderByAlphabet(e)}
            >
              <option value="title" selected="defaultValue" disabled>
                Order by Alphabet
              </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <select
              className="filtrosSelect"
              value={filtros}
              onChange={(e) => handleOrderByAttack(e)}
            >
              <option value="title" selected="defaultValue" disabled>
                Order by Power
              </option>
              <option value="power">Powerful</option>
              <option value="weak">Weak</option>
            </select>
            <select
              className="filtrosSelect"
              value={filtros}
              onChange={(e) => handleFilterByType(e)}
            >
              <option value="title" selected="defaultValue" disabled>
                Filter by Types
              </option>
              <option value="all">All</option>
              {allTypes?.map((t) => {
                return (
                  <option value={t} key={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                );
              })}
            </select>
            <select
              className="filtrosSelect"
              value={filtros}
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="title" selected="defaultValue" disabled>
                Filter by Created/Existing
              </option>
              <option value="all">All</option>
              <option value="exist">Existing</option>
              <option value="created">Created</option>
            </select>
            <button
              className="buttonReload"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reload Pokemons
            </button>
            <SearchBar setPage={setPage} />
          </div>
          <Paginado
            setPage={setPage}
            page={page}
            pokePerPage={pokePerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
          {error ? (
            <div>
              <h2>
                Not matches found, please change filters or reload all pokemons
              </h2>
              <img src={imageError} className="imageMew" />
            </div>
          ) : allPokemons.length > 0 ? (
            <div className="divPokesHome">
              {currentPokemons.map((p) => {
                return (
                  <div className="cardsHome" key={p.id}>
                    <Link to={`/home/${p.id}`} className="link">
                      <Card
                        key={p.id}
                        name={p.name}
                        types={p.types}
                        image={p.image}
                        id={p.id}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default Home;
