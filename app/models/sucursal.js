/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Sucursal extends Model {
    static associate(models) {

    }
  }
  Sucursal.init({
    sucursal_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "sucursal",
    tableName: "sucursales",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Sucursal;
};