/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Ciudad extends Model {
    static associate(models) {
      this.belongsTo(models.pais, {foreignKey: "pais_id"});
    }
  }
  Ciudad.init({
    ciudad_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: DataTypes.STRING(1000),
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
    pais_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pais",
        key: "pais_id",
      },
    },
  }, {
    sequelize,
    modelName: "ciudad",
    tableName: "ciudades",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Ciudad;
};
