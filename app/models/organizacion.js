/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Organizacion extends Model {
    static associate(models) {
      this.belongsTo(models.persona, {foreignKey: "persona_id", as: "persona"});
      this.hasMany(models.contacto, {foreignKey: "contacto_id",
        as: "contactos"});
    }
  }
  Organizacion.init({
    organizacion_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "persona",
        key: "persona_id",
      },
    },
    descripcion: DataTypes.TEXT,
    website: DataTypes.STRING,
    usu_insercion: DataTypes.STRING(20),
    usu_modificacion: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: "organizacion",
    tableName: "organizaciones",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Organizacion;
};
