/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("encuesta_respuestas", {
    respuesta_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Identificador único de la respuessta.",
      type: Sequelize.INTEGER,
    },
    oportunidad_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "oportunidades",
        },
        key: "oportunidad_id",
      },
      comment: "Oportunidad a la que está asociada la respuesta.",
      allowNull: false,
    },
    contacto_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "contactos",
        },
        comment: "Id del contacto que respondió la encuesta.",
        key: "contacto_id",
      },
      allowNull: false,
    },
    json: {
      allowNull: false,
      type: Sequelize.JSON,
      comment: "Almacena el valor de las preguntas y respuestas" +
      "al momento del envío.",
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


