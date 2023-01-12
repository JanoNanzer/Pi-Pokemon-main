import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonId, setDetailEmpty, deletePoke } from "../../actions";
import LoadingDetail from "../LoadingDetail/LoadingDetail";
import "./PokemonDetail.css";
import "../PokemonImages/CardsColor/CardsColor.css";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();

  // States from reducer
  const pokemonId = useSelector((state) => state.details);
  const allPokemons = useSelector((state) => state.allPokemons);

  // Set states for confirm box
  const deleteConfirmation = useSelector((state) => state.deleteConfirmation);
  const [confirmBox, setConfirmbox] = useState(false);
  const [success, setSuccess] = useState(false);

  // Come back to home page
  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemonId(props.match.params.id));
    return () => {
      dispatch(setDetailEmpty());
    };
  }, [dispatch]);

  // Delete pokemon
  // const handleDelete = () => {
  //   // if (pokemonId.created) {
  //     dispatch(deletePoke(pokemonId.id));
  //     setTimeout(() => history.push("/home"), 1000);
  //   // } else {
  //   //   alert("Can not delete an original Pokemon");
  //   // }
  // };

  function handleDelete() {
    setConfirmbox(true);
  }

  function denyDelete() {
    setConfirmbox(false);
    // history.push("/home");
  }

  function acceptDelete() {
    dispatch(deletePoke(pokemonId.id));
    setConfirmbox(false);
    setSuccess(true);
  }

  function successfullDelete() {
    setSuccess(false);
    // dispatch(clearError())
    history.push("/home");
  }

  // Split api pokemon types, and make an array of each types
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
                    <td className="firstValues">Id</td>
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
                    <td className="firstValues">Height</td>
                    <td>{pokemonId.height / 10}m</td>
                  </tr>
                  <tr>
                    <td className="firstValues">Weight</td>
                    <td>{pokemonId.weight / 10}kg</td>
                  </tr>
                  <tr>
                    <td className="firstValues">Types</td>
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
                    <td className="firstValues">HP</td>
                    <td>{pokemonId.hp}</td>
                  </tr>
                  <tr>
                    <td className="firstValues">Attack</td>
                    <td>{pokemonId.attack}</td>
                  </tr>
                  <tr>
                    <td className="firstValues">Defense</td>
                    <td>{pokemonId.defense}</td>
                  </tr>
                  <tr>
                    <td className="firstValues">Speed</td>
                    <td>{pokemonId.speed}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          {typeof pokemonId.id === "string" ? (
            <div className="delete">
              <button className="deleteButton" onClick={handleDelete}>
                Delete
              </button>
            </div>
          ) : null}
          {confirmBox && (
            <div className="confirmationBox">
              <h2>{`You want to delete ${pokemonId.name} ?`}</h2>
              <div className="confirmationContainer">
                <button className="confirmButton denied" onClick={denyDelete}>
                  NO
                </button>
                <button
                  className="confirmButton confirmed"
                  onClick={acceptDelete}
                >
                  YES
                </button>
              </div>
            </div>
          )}
          {success && (
            <div className="successContainer">
              <h2>{deleteConfirmation}</h2>
              <button
                className="confirmButton confirmed"
                onClick={successfullDelete}
              >
                Ok
              </button>
            </div>
          )}
        </div>
      ) : (
        <LoadingDetail />
      )}
    </div>
  );
};

export default PokemonDetail;
