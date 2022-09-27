import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonId, setDetailEmpty, deletePoke } from "../../actions";
import LoadingDetail from "../LoadingDetail/LoadingDetail";
import "./PokemonDetail.css";
import "../PokemonImages/CardsColor/CardsColor.css";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const pokemonId = useSelector((state) => state.details);
  const allPokemons = useSelector((state) => state.allPokemons);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemonId(props.match.params.id));
    return () => {
      dispatch(setDetailEmpty());
    };
  }, [dispatch]);

  const handleDelete = () => {
    if (pokemonId.created) {
      dispatch(deletePoke(pokemonId.id));
      setTimeout(() => history.push("/home"), 1000);
    } else {
      alert("Can not delete an original Pokemon");
    }
  };

  let types =
    typeof pokemonId.id === "string"
      ? pokemonId.types.split(", ")
      : pokemonId.types;

  return (
    <div className="outerDiv">
      <Link to={"/home"} className="linkHome">
        Home
      </Link>
      {pokemonId.id !== undefined ? (
        <div className="innerDiv">
          <h1 className="detailName">{pokemonId.name}</h1>

          <div className="pokediv">
            <div className="divPerspective">
              <div className="detailInfoLeft">
                <table className="detailTable">
                  <tr>
                    <td>Id</td>
                    <td>
                      #{" "}
                      {pokemonId.id < 100 || !typeof pokemonId.id === "string"
                        ? pokemonId.id < 10
                          ? `00${pokemonId.id}`
                          : `0${pokemonId.id}`
                        : pokemonId.id}
                    </td>
                  </tr>
                  <tr>
                    <td>Height</td>
                    <td>{pokemonId.height / 10}m</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{pokemonId.weight / 10}kg</td>
                  </tr>
                  <tr>
                    <td>Types</td>
                    {types &&
                      types.map((t) => {
                        return (
                          <td className={t.toUpperCase()} key={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </td>
                        );
                      })}
                  </tr>
                </table>
              </div>
            </div>
            <div>
              <img src={pokemonId.image} className="pokeImage" />
            </div>
            <div className="divPerspective">
              <div className="detailInfoRight">
                <table className="detailTable">
                  <tr>
                    <td>HP</td>
                    <td>{pokemonId.hp}</td>
                  </tr>
                  <tr>
                    <td>Attack</td>
                    <td>{pokemonId.attack}</td>
                  </tr>
                  <tr>
                    <td>Defense</td>
                    <td>{pokemonId.defense}</td>
                  </tr>
                  <tr>
                    <td>Speed</td>
                    <td>{pokemonId.speed}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className="delete">
            <button className="deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <LoadingDetail />
      )}
    </div>
  );
};

export default PokemonDetail;
