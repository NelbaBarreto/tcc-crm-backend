/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Contacto extends Model {
    static associate(models) {
      this.belongsTo(models.persona, {foreignKey: "persona_id", as: "persona"});
      this.hasOne(models.encuesta_respuesta, {foreignKey: "oportunidad_id"});
    }
  }
  Contacto.init({
    contacto_id: {
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
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "contacto",
    tableName: "contactos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Contacto;
};
