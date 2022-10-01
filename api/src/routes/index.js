const axios = require("axios");
const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const { getAllinfo, createNewPoke, getTypes, getDataBasePoke } = require("./functions");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// Get all pokemons and find one by name
router.get("/pokemon", async (req, res) => {
  try {
    let name = req.query.name;
    let all = await getAllinfo();
    if (name) {
      let pokeFilter = all.filter(
        (p) => p.name.toLowerCase() === name.toLocaleLowerCase()
      );
      return pokeFilter.length > 0
        ? res.json(pokeFilter)
        : res.status(404).json("Name not found. Choose another pokemon");
    }
    res.json(all);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Get all pokemon types
router.get("/types", async (req, res) => {
  try {
    let allTypes = await getTypes();
    res.status(200).json(allTypes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Find pokemon by id
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let all = await getAllinfo();
    if (id) {
      let pokeId = all.find((p) => p.id.toString() === id);
      pokeId
        ? res.json(pokeId)
        : res.status(404).json({ error: `No pokemon found with id: ${id}.` });
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

// Delete pokemon
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const findPoke = await Pokemon.findByPk(id);
      if (findPoke.created) {
        await findPoke.destroy();
        return res.send("Pokemon has been deleted");
      } else {
        return res.status(404).json("Can not delete an original Pokemon");
      }
    }
  } catch (error) {
    return res.status(404).json("Can not delete an original Pokemon");
  }
});

// Create new Pokemon
router.post("/addPokemon", async (req, res) => {
  try {
    let { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;
    let newPoke = await createNewPoke(
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types
    );
    res.json(newPoke);
  } catch (error) {
    console.log(error);
    res.status(404).json("Name already exist. Choose another name");
  }
});

// router.delete('/deletePokemons', async(req,res)=>{
//   try {
//     await Pokemon.destroy({where: {name:'Henry'}})
//     res.send('Delete Complete')
//   } catch (error) {
    
//   }
// })

module.exports = router;