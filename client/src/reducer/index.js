const initialState = {
  pokemons: [],
  allPokemons: [],
  pokeType: [],
  pokeCreated: [],
  error: null,
  details: [],
  types: [],
  deleteConfirmation:''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        pokeCreated: action.payload,
        error: null,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons2 = state.allPokemons;
      const statusFiltered =
        action.payload === "all"
          ? allPokemons2
          : allPokemons2.filter((e) => e.types.includes(action.payload));
      const commonPokes1 =
        state.pokeCreated.length > 0
          ? statusFiltered.filter((p) => state.pokeCreated.includes(p))
          : statusFiltered;
      return {
        ...state,
        pokemons: commonPokes1,
        pokeType: statusFiltered,
        error: commonPokes1.length === 0 ? { mensaje: "Noup" } : null,
      };
    case "FILTER_CREATED":
      const allPokemons3 = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemons3.filter((p) => p.created)
          : allPokemons3.filter((p) => !p.created);
      const commonPokes2 =
        state.pokeType.length > 0
          ? createdFilter.filter((p) => state.pokeType.includes(p))
          : createdFilter;
      return {
        ...state,
        pokemons: action.payload === "all" ? allPokemons3 : commonPokes2,
        pokeCreated: createdFilter,
        error: commonPokes2.length === 0 ? { mensaje: "Noup" } : null,
      };
    case "ORDER_BY_ALPHABET":
      const allPokemons4 = state.pokemons;
      let sortedArrByName =
        action.payload === "asc"
          ? allPokemons4.sort((a, b) => {
              if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
              if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
              return 0;
            })
          : allPokemons4.sort((a, b) => {
              if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
              if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArrByName,
      };
    case "ORDER_BY_ATTACK":
      const allPokemons5 = state.pokemons;
      let sortedArrByAtack =
        action.payload === "power"
          ? allPokemons5.sort((a, z) => {
              if (a.attack > z.attack) return -1;
              if (z.attack > a.attack) return 1;
              return 0;
            })
          : allPokemons5.sort((a, z) => {
              if (a.attack > z.attack) return 1;
              if (z.attack > a.attack) return -1;
              return 0;
            });
      // console.log(sortedArrByAtack);
      return {
        ...state,
        pokemons: sortedArrByAtack,
      };
    case "GET_POKEMON_NAME":
      return {
        ...state,
        pokemons: action.payload,
        error: null,
      };
    case "CREATE_POKEMON":
      return {
        ...state,
      };
    case "GET_POKEMON_ID":
      return {
        ...state,
        details: action.payload,
      };
    case "SET_EMPTY_DETAIL":
      return {
        ...state,
        details: [],
      };
    case "DELETE_POKEMON":
      return { ...state,
      deleteConfirmation: action.payload  };
    case "GET_POKE_STORE":
      return {
        ...state,
        pokemons: state.allPokemons,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
