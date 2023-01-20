/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, Sequelize) => {
  class CicloAula extends Model {
    static associate(models) {
      this.belongsTo(models.sede,
          {foreignKey: "sede_id", as: "sede"});
      this.belongsTo(models.curso_ciclo,
          {foreignKey: "ciclo_id", as: "ciclo"});
      this.belongsTo(models.curso,
          {foreignKey: "curso_id"});
    }
  }
  CicloAula.init({
    aula_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    hor_inicio: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    hor_fin: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    dias: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    cupo_total: {
      type: Sequelize.INTEGER,
    },
    sede_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "sedes",
        },
        key: "sede_id",
      },
      allowNull: false,
    },
    ciclo_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "curso_ciclos",
        },
        key: "ciclo_id",
      },
      allowNull: false,
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
  }, {
    sequelize,
    modelName: "ciclo_aula",
    tableName: "ciclo_aulas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return CicloAula;
};
