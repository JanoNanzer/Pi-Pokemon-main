import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../actions";
import "./SearchBar.css";

const SearchBar = ({ setPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(name));
    setName("");
    setTimeout(() => setPage(1), 2000);
  };

  return (
    <div className="searchBar">
      <button
        className="lensIcon"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        🔎
      </button>
      <input
        className="inputSearchBar"
        value={name}
        id="inputName"
        type="text"
        placeholder="Search by Name"
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

export default SearchBar;
