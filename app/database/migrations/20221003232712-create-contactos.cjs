/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("contactos", {
    contacto_id: {
      comment: "Identificador único del contacto.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    persona_id: {
      type: Sequelize.INTEGER,
      comment: "Id de persona del contacto.",
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: false,
    },
    organizacion_id: {
      type: Sequelize.INTEGER,
      comment: "Id de la organización a la que pertenece el contacto.",
      references: {
        model: {
          tableName: "organizaciones",
        },
        key: "organizacion_id",
      },
      allowNull: true,
    },
    origen: {
      type: Sequelize.ENUM("Redes Sociales", "Página Web", "Llamada", "Correo",
          "Evento", "Otro"),
      comment: "Origen del lead.",
      allowNull: false,
      defaultValue: "Otro",
    },
    // Auditoria
    usu_insercion: {
      allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que insertó el registro.",
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
    usu_modificacion: {
      allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que modificó el registro por última vez.",
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("contactos");
}
