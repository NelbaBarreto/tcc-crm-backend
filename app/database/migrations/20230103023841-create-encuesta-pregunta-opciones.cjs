/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("encuesta_pregunta_opciones", {
    opcion_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Identificador único de la opción.",
      type: Sequelize.INTEGER,
    },
    pregunta_id: {
      type: Sequelize.INTEGER,
      comment: "Id de la pregunta a la que pertenece la opción.",
      references: {
        model: {
          tableName: "encuesta_preguntas",
        },
        key: "pregunta_id",
      },
      allowNull: false,
    },
    etiqueta: {
      allowNull: false,
      type: Sequelize.STRING,
      comment: "Etiqueta de la opción.",
    },
    valor: {
      allowNull: false,
      type: Sequelize.INTEGER,
      comment: "Valor de la opción.",
    },
    componente: {
      allowNull: false,
      type: Sequelize.ENUM("RadioButton", "TextArea"),
      comment: "Tipo de componente que se debe mostrar para cargar el valor.",
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
  await queryInterface.dropTable("encuesta_pregunta_opciones");
}

