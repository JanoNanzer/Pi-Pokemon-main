const axios = require("axios").default;
const { Pokemon, Type } = require("../db");

// Get Api Info
const getAllApiPoke = async () => {
  let allPokes = [];
  const apiPokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=60"
  );
  // const apiPokemonsNext = await axios.get(apiPokemons.data.next); //40 pokemons
  // const apiPokemonsNext2 = await axios.get(apiPokemonsNext.data.next); //60 pokemons
  // const apiPokemonsNext3 = await axios.get(apiPokemonsNext2.data.next);//80 pokemons
  // const apiPokemonsNext4 = await axios.get(apiPokemonsNext3.data.next);//100 pokemons

  const allPokeApi = apiPokemons.data.results; /* .concat(
    apiPokemonsNext.data.results,
    apiPokemonsNext2.data.results
  ) */ // -> concat 60 pokemons
  // const allPokeApi = apiPokemons.data.results.concat(apiPokemonsNext.data.results,
  //     apiPokemonsNext2.data.results,apiPokemonsNext3.data.results,apiPokemonsNext4.data.results);
  // console.log(allPokeApi)

  const allPokeUrl = allPokeApi.map((p) => axios.get(p.url));

  await axios.all(allPokeUrl).then((e) => {
    e.map((p) => {
      allPokes.push({
        id: p.data.id,
        name: p.data.name.charAt(0).toUpperCase() + p.data.name.slice(1),
        hp: p.data.stats.find((s) => s.stat.name === "hp").base_stat,
        attack: p.data.stats.find((s) => s.stat.name === "attack").base_stat,
        defense: p.data.stats.find((s) => s.stat.name === "defense").base_stat,
        speed: p.data.stats.find((s) => s.stat.name === "speed").base_stat,
        height: p.data.height,
        weight: p.data.weight,
        image: p.data.sprites.other["official-artwork"].front_default,
        types: p.data.types.map((e) => e.type.name),
      });
    });
  });
  return allPokes;
};

// Get Created Pokemons from DB
const getDataBasePoke = async () => {
  const allPokeDB = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  return allPokeDB;
};

// Concat info from API and DB
const getAllinfo = async () => {
  const infoApi = await getAllApiPoke();
  let infoDb = await getDataBasePoke();
  infoDb.forEach((p) => {
    let newArr = p.dataValues.types.map((e) => {
      return e.dataValues.name;
    });
    p.dataValues.types = newArr.join(", ");
  });

  const allInfo = infoApi.concat(infoDb);
  return allInfo;
};
// Create New Pokemon
const createNewPoke = async (
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  image,
  types
) => {
  if (!image || image === "")
    image =
      "https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/06/4ad6e-pikachu-png-background.png?resize=900%2C900&ssl=1";
  const newPoke = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  });

  const DataBaseTypes = await Type.findAll({ where: { name: types } });
  await newPoke.addTypes(DataBaseTypes);

  const newPokeWithTypes = { ...newPoke.dataValues, types: types.join(", ") };

  console.log(newPokeWithTypes);
  return newPokeWithTypes;
};

// Get all types and save then into DB
const getTypes = async () => {
  const apiData = await axios.get("https://pokeapi.co/api/v2/type");

  const types = apiData.data.results.map((e) => e.name).flat();
  const uniqueTypes = [...new Set(types)];

  uniqueTypes.forEach(async (e) => {
    if (!e) return;

    const [type, created] = await Type.findOrCreate({
      where: { name: e },
    });
  });

  let typesDB = await Type.findAll();
  typesDB = typesDB.map((e) => e.dataValues.name);
  return typesDB;
};

module.exports = { getAllinfo, createNewPoke, getTypes };
