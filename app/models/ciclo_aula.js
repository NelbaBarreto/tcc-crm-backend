/* eslint-disable require-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class CicloAula extends Model {
    static associate(models) {
      // define association here
    }
  }
  CicloAula.init({
    hor_inicio: DataTypes.TIME,
    hor_fin: DataTypes.TIME,
  }, {
    sequelize,
    modelName: "ciclo_aula",
    tableName: "ciclo_aulas",
  });
  return CicloAula;
};
