import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from "../../actions";
import "./PokemonCreate.css";
import "../PokemonImages/PokemonTypesColor/PokemonTypesColor.css";

const validate = (input, allPokemons) => {
  let errors = {};

  if (!/^[ a-zA-Z ]+$/.test(input.name) || !input.name)
    errors.name = "Name must be only letters and not empty";
  if (
    allPokemons.some((e) => e.name.toUpperCase() === input.name.toUpperCase())
  )
    errors.name = "Name already exist";
  if(input.name.length === 13) errors.name = "Name can\'t be longer than 13 characters";
  if (input.hp < 1 || input.hp > 500)
    errors.hp = "HP value must be between 1-500";
  if (input.attack < 1 || input.attack > 750)
    errors.attack = "Attack value must be between 1-750";
  if (input.defense < 1 || input.defense > 750)
    errors.defense = "Defense value must be between 1-750";
  if (input.speed < 1 || input.speed > 500)
    errors.speed = "Speed must be between 1-500";
  if (input.height <= 0 || input.height > 1000)
    errors.height = "Height must be between 1-1.000";
  if (input.weight <= 0 || input.weight > 1000)
    errors.weight = "Weight must be between 1-1.000";
  if (input.types.length === 0) errors.types = "At least 1 type. Max 2 types";
  return errors;
};

function buttonHab(p) {
  if (Object.keys(p).length === 0) return false;
  else return true;
}

const PokemonCreate = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.allPokemons);
  const history = useHistory();
  let [button, setButton] = useState(true);

  const [errors, setErrors] = useState([
    {
      name: " ",
      hp: "Required HP",
      attack: "Required Attack",
      defense: "Required Defense",
      speed: "Required Speed",
      height: "Required min 0 || max 10000",
      weight: "Required min 0 || max 6000",
      image: " ",
      types: [],
    },
  ]);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    setButton(buttonHab(errors));
  }, [errors]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        allPokemons
      )
    );
  };

  const handleSelect = (e) => {
    if (!input.types.includes(e.target.value)) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    setErrors(
      validate(
        { ...input, types: [...input.types, e.target.value] },
        allPokemons
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    dispatch(createPokemon(input));
    alert("Pokemon created!!");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
    history.push("/home");
  };

  const handleDeleteType = (type) => {
    input.types.length === 0 ? setButton(false) : setButton(true);
    setInput({
      ...input,
      types: input.types.filter((t) => t !== type),
    });
  };

  return (
    <div className="outterDivCreate">
      <h1 className="tituloCreatePokemon">Create your own Pokemon</h1>
      <div className="innerDivCreate">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">Name </label>
              <input
                maxLength="13"
                className="inputs"
                type="text"
                autoComplete="off"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder="Pokemon name..."
              />
            </div>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">HP </label>
              <input
                min="1"
                max="500"
                className="inputs"
                type="number"
                value={input.hp}
                name="hp"
                onChange={(e) => handleChange(e)}
                placeholder="HP value..."
              />
            </div>
            {errors.hp && <p className="error">{errors.hp}</p>}
          </div>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">Attack </label>
              <input
                min="1"
                max="750"
                className="inputs"
                type="number"
                value={input.attack}
                name="attack"
                onChange={(e) => handleChange(e)}
                placeholder="Attack value..."
              />
            </div>
            {errors.attack && <p className="error">{errors.attack}</p>}
          </div>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">Defense </label>
              <input
                min="1"
                max="750"
                className="inputs"
                type="number"
                value={input.defense}
                name="defense"
                onChange={(e) => handleChange(e)}
                placeholder="Defense value..."
              />
            </div>
            {errors.defense && <p className="error">{errors.defense}</p>}
          </div>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">Speed </label>
              <input
                min="1"
                max="500"
                className="inputs"
                type="number"
                value={input.speed}
                name="speed"
                onChange={(e) => handleChange(e)}
                placeholder="Speed value..."
              />
            </div>
            {errors.speed && <p className="error">{errors.speed}</p>}
          </div>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">Height </label>
              <input
                min="1"
                max="1000"
                className="inputs"
                type="number"
                value={input.height}
                name="height"
                onChange={(e) => handleChange(e)}
                placeholder="Height value (cm)..."
              />
            </div>
            {errors.height && <p className="error">{errors.height}</p>}
          </div>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">Weight </label>
              <input
                min="1"
                max="1000"
                className="inputs"
                type="number"
                value={input.weight}
                name="weight"
                onChange={(e) => handleChange(e)}
                placeholder="Weight value..."
              />
            </div>
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
          <div className="inputContainer">
            <div className="innerDivContainer">
              <label className="inputsName">Image </label>
              <input
                className="inputs"
                type="url"
                autoComplete="off"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
                placeholder="Image url... (Optional)"
              />
            </div>
            <p className="imageWarning">Warning! Image must be URL</p>
          </div>
          <div className="typesContainer">
            <select
              className="selectTypes"
              onChange={(e) => handleSelect(e)}
              disabled={input.types.length === 2}
            >
              <option value="select " selected="defaultValue" disabled>
                Select Type
              </option>
              {types?.map((t) => {
                return (
                  <option value={t} key={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                );
              })}
            </select>
            <div className="divEachType">
              {input.types.map((t, index) => (
                <div key={index}>
                  <span
                    className={t}
                    key={t}
                    onClick={() => handleDeleteType(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </div>
              ))}
              <div>
                {errors.types && (
                  <p className="error pTypeError">{errors.types}</p>
                )}
              </div>
            </div>
            {input.types.length === 0 ? (
              <div className="secondErrorType">Select at least one type</div>
            ) : (
              false
            )}
          </div>
          <div className="divBottomButtons">
            <button
              className={
                Object.keys(errors).length || input.types.length === 0
                  ? "buttonCreateDisabled"
                  : "buttonCreate"
              }
              type="submit"
              disabled={
                Object.keys(errors).length || input.types.length === 0
                  ? button
                  : false
              }
            >
              Create Pokemon
            </button>
            <Link className="goBackCreate" to="/home">
              Go back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PokemonCreate;
