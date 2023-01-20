/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("ciclo_profesores", {
    ciclo_profesor_id: {
      comment: "Identificador único del registro.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    profesor_id: {
      type: Sequelize.INTEGER,
      comment: "Profesor encargado del aula.",
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
      comment: "Ciclo al que pertenecen el aula y profesor.",
      references: {
        model: {
          tableName: "curso_ciclos",
        },
        key: "ciclo_id",
      },
      allowNull: true,
    },
    aula_id: {
      type: Sequelize.INTEGER,
      comment: "Identificador único del aula en la que" +
      "se desarrollarán las clases.",
      references: {
        model: {
          tableName: "ciclo_aulas",
        },
        key: "aula_id",
      },
      allowNull: true,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "fec_modificacion",
      comment: "Fecha en la que se modificó el registro por última vez.",
      defaultValue: Date.now(),
    },
    usu_modificacion: {
      allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que modificó el registro por última vez.",
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("ciclo_profesores");
}
