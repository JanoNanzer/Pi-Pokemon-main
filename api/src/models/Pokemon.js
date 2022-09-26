const { DataTypes } = require("sequelize");
const { all } = require("../routes");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        },
      },
      attack: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        },
      },
      height: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0.1,
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0.1,
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
