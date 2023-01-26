/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      this.hasMany(models.lead, {foreignKey: "curso_id"});
      this.hasMany(models.oportunidad, {foreignKey: "curso_id"});
      this.hasMany(models.contacto, {foreignKey: "contacto_id"});
      this.hasMany(models.lead, {foreignKey: "lead_id"});
    }
  }
  Curso.init({
    curso_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    contacto_id: DataTypes.INTEGER,
    lead_id: DataTypes.INTEGER,
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "curso",
    tableName: "cursos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Curso;
};
