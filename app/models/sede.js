/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Sede extends Model {
    static associate(models) {
      this.hasOne(models.direccion, {foreignKey: "sede_id"});
      this.hasMany(models.curso_ciclo, { foreignKey: "ciclo_id" });
    }
  }
  Sede.init({
    sede_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "sede",
    tableName: "sedes",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Sede;
};
