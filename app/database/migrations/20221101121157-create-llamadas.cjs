/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("llamadas", {
    llamada_id: {
      comment: "Identificador único de la llamada.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    asunto: {
      comment: "Asunto de la llamada.",
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.ENUM("Pendiente", "Finalizado", "Cancelado"),
      comment: "Estado de la llamada",
      allowNull: false,
    },
    tipo: {
      type: Sequelize.ENUM("Entrante", "Saliente"),
      comment: "Tipos de llamadas.",
      allowNull: false,
    },
    fec_inicio: {
      comment: "Fecha de inicio de la actividad.",
      type: Sequelize.DATE,
      allowNull: false,
    },
    contacto_id: {
      comment: "Id de contacto para el caso.",
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "contactos",
        },
        key: "contacto_id",
      },
      allowNull: true,
    },
    lead_id: {
      comment: "Id del lead para el caso.",
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "leads",
        },
        key: "lead_id",
      },
      allowNull: true,
    },
    descripcion: {
      comment: "Descripción de la llamada.",
      type: Sequelize.TEXT,
    },
    // Auditoria
    usu_insercion: {
      // allowNull: false,
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
      // allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que modificó el registro por última vez.",
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("llamadas");
}
