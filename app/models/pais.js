/* eslint-disable require-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Pais extends Model {
    static associate(models) {
      this.hasMany(models.ciudad, {foreignKey: "pais_id"});
      this.belongsTo(models.sucursal, {foreignKey: "pais_id", as: "pais"});
    }
  }
  Pais.init({
    pais_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: DataTypes.STRING,
    nom_corto: DataTypes.STRING,
    cod_telefono: DataTypes.STRING,
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "pais",
    tableName: "paises",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Pais;
};
