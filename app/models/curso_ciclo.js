/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Curso_Ciclo extends Model {
    static associate(models) {
      // define association here
    }
  }
  Curso_Ciclo.init({
    curso_id: DataTypes.INTEGER,
    nivel: DataTypes.STRING,
    fec_inicio: DataTypes.DATE,
    fec_fin: DataTypes.DATE,
  }, {
    sequelize,
    modelName: "curso_ciclo",
    tableName: "curso_ciclos",
  });
  return Curso_Ciclo;
};
