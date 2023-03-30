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
      validate: {
        notNull: {
          msg: "Completar Nombre, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Nombre, es un campo Obligatorio.",
        },
        len: {
          args: [3, 255],
          msg: "El nombre debe tener entre 3 y 255 caracteres.",
        },
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
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
