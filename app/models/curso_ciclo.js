/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, Sequelize) => {
  class Curso_Ciclo extends Model {
    static associate(models) {
      this.belongsTo(models.curso, {foreignKey: "curso_id"});
    }
  }
  Curso_Ciclo.init({
    ciclo_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    curso_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "cursos",
        },
        key: "curso_id",
      },
      allowNull: false,
    },
    codigo: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    nivel: {
      type: Sequelize.STRING(50),
    },
    fec_inicio: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    fec_fin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    detalles: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "curso_ciclo",
    tableName: "curso_ciclos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Curso_Ciclo;
};
