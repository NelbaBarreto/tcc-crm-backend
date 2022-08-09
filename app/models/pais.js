/* eslint-disable require-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Paises extends Model {
    // eslint-disable-next-line valid-jsdoc
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paises.init({
    pais_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "paises",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Paises;
};
