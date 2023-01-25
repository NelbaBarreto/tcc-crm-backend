/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("encuesta_pregunta_respuestas", {
    pregunta_respuesta_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Identificador único de la respuesta.",
      type: Sequelize.INTEGER,
    },
    respuesta_id: {
      type: Sequelize.INTEGER,
      comment: "Id de la cabecera de la respuesta.",
      references: {
        model: {
          tableName: "encuesta_respuestas",
        },
        key: "respuesta_id",
      },
      allowNull: false,
    },
    pregunta_id: {
      type: Sequelize.INTEGER,
      comment: "Id de la pregunta a la que pertenece la respuesta.",
      references: {
        model: {
          tableName: "encuesta_preguntas",
        },
        key: "pregunta_id",
      },
      allowNull: false,
    },
    valor: {
      allowNull: true,
      type: Sequelize.TEXT,
      comment: "Valor de la respuesta.",
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
  await queryInterface.dropTable("encuesta_pregunta_respuestas");
}

