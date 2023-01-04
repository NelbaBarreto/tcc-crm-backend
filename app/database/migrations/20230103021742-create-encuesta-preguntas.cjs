/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("encuesta_preguntas", {
    pregunta_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Identificador único de la pregunta.",
      type: Sequelize.INTEGER,
    },
    pregunta: {
      allowNull: false,
      type: Sequelize.STRING,
      comment: "Pregunta a mostrarse en la encuesta de satisfacción.",
    },
    obligatorio: {
      defaultValue: false,
      comment: "Indica si es obligatorio responder la pregunta.",
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "fec_insercion",
      comment: "Fecha en la que se creó el registro.",
      defaultValue: Date.now(),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "fec_modificacion",
      comment: "Fecha en la que se modificó el registro por última vez.",
      defaultValue: Date.now(),
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("encuesta_preguntas");
}


