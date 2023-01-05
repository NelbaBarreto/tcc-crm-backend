/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Campana extends Model {
    static associate(models) {
      this.hasMany(models.lead, {foreignKey: "campana_id"});
    }
  }
  Campana.init({
    nombre: DataTypes.STRING,
    campana_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    fec_inicio: DataTypes.DATE,
    fec_fin: DataTypes.DATE,
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "campana",
    tableName: "campanas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Campana;
};
