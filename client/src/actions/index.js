import axios from "axios";

export const getPokemons = () => {
  return async (dispatch) => {
    let json = await axios.get("/pokemon");
    return dispatch({ type: "GET_POKEMONS", payload: json.data });
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    let json = await axios.get("/types");
    return dispatch({ type: "GET_TYPES", payload: json.data });
  };
};

export const getPokemonByType = (payload) => {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
};

export const orderByAlphabet = (payload) => {
  return {
    type: "ORDER_BY_ALPHABET",
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: "FILTER_CREATED",
    payload,
  };
};

export const orderByAtack = (payload) => {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
};

// export const getPokemonByName = (name) => {
//   return async (dispatch) => {
//     try {
//       if (name === "") return alert("Please introduce a valid name");
//       var json = await axios.get(`/pokemon?name=${name}`);
//       return dispatch({ type: "GET_POKEMON_NAME", payload: json.data });
//     } catch (error) {
//       alert(error.response.data);
//     }
//   };
// };

export const getPokemonByName = (name) => {
  return { type: "GET_POKEMON_NAME", payload: name };
};

export const createPokemon = (payload) => {
  return async (dispatch) => {
    try {
      let json = await axios.post("/addPokemon", payload);
      return dispatch({ type: "CREATE_POKEMON", payload: json.data });
    } catch (error) {
      alert(error);
    }
  };
};

export const getPokemonId = (id) => {
  return async (dispatch) => {
    let json = await axios.get(`/${id}`);
    return dispatch({ type: "GET_POKEMON_ID", payload: json.data });
  };
};

export const setDetailEmpty = () => {
  return { type: "SET_EMPTY_DETAIL" };
};

export const getPokeStore = () => {
  return { type: "GET_POKE_STORE" };
};

export const deletePoke = (id) => {
  return async (dispatch) => {
    try {
      let json = await axios.delete(`/delete/${id}`);
      return dispatch({ type: "DELETE_POKEMON", payload: json.data.pokemon });
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
};
