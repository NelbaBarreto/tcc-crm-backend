/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("tareas", {
    tarea_id: {
      comment: "Identificador único de la tarea.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    asunto: {
      comment: "Título de la tarea.",
      type: Sequelize.STRING,
      allowNull: false,
    },
    descripcion: {
      comment: "Descripción de la tarea.",
      type: Sequelize.TEXT,
    },
    estado: {
      type: Sequelize.ENUM("Pendiente", "Asignado", "En curso",
          "Cancelado", "Finalizado"),
      comment: "Estado del Caso",
      allowNull: false,
    },
    prioridad: {
      type: Sequelize.ENUM("Alta", "Media", "Baja"),
      comment: "Prioridad de la tarea.",
      allowNull: false,
    },
    fec_inicio: {
      comment: "Fecha de inicio de la actividad.",
      type: Sequelize.DATE,
      allowNull: false,
    },
    fec_fin: {
      comment: "Fecha prevista de finalización de la actividad.",
      type: Sequelize.DATE,
    },
    usu_asignado_id: {
      type: Sequelize.INTEGER,
      comment: "Id de usuario asignado.",
      references: {
        model: {
          tableName: "usuarios",
        },
        key: "usuario_id",
      },
      allowNull: true,
    },
    contacto_id: {
      comment: "Id de contacto para el caso.",
      type: Sequelize.INTEGER,
    },
    lead_id: {
      comment: "Id del lead para el caso.",
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable("tareas");
}