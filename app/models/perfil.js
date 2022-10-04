/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Perfil extends Model {
    static associate(models) {}
  }
  Perfil.init({
    perfil_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "perfil",
    tableName: "perfiles",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Perfil;
};
