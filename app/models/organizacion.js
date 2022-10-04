/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Organizacion extends Model {
    static associate(models) {
      this.belongsTo(models.persona, {foreignKey: "persona_id", as: "persona"});
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
    raz_social: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    descripcion: DataTypes.STRING(1000),
    website: DataTypes.STRING(500),
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "organizacion",
    tableName: "organizaciones",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Organizacion;
};
