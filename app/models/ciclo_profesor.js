/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, Sequelize) => {
  class Ciclo_Profesor extends Model {
    static associate(models) {
      this.belongsTo(models.profesor,
          {foreignKey: "profesor_id"});
      this.belongsTo(models.curso_ciclo,
          {foreignKey: "ciclo_id"});
    }
  }
  Ciclo_Profesor.init({
    ciclo_profesor_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    profesor_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "profesores",
        },
        key: "profesor_id",
      },
      allowNull: true,
    },
    ciclo_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "curso_ciclos",
        },
        key: "ciclo_id",
      },
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: "ciclo_profesor",
    tableName: "ciclo_profesores",
  });
  return Ciclo_Profesor;
};
