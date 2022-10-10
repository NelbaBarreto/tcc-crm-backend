/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("casos", {
    caso_id: {
      comment: "Identificador único del caso.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    asunto: {
      comment: "Título del caso.",
      type: Sequelize.STRING,
      allowNull: false,
    },
    descripcion: {
      comment: "Descripción del caso.",
      type: Sequelize.TEXT,
      allowNull: false,
    },
    prioridad: {
      type: Sequelize.ENUM("Alta", "Media", "Baja"),
      comment: "Estado del Caso",
      allowNull: false,
    },
    estado: {
      // eslint-disable-next-line max-len
      type: Sequelize.ENUM("Pendiente", "Asignado", "En curso", "Cancelado", "Finalizado"),
      comment: "Estado del Caso",
      allowNull: false,
    },
    tipo: {
      type: Sequelize.INTEGER,
    },
    origen: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    solucion: {
      type: Sequelize.STRING,
    },
    usu_asignado_id: {
      type: Sequelize.INTEGER,
      comment: "Id de usuario asginado.",
      references: {
        model: {
          tableName: "usuarios",
        },
        key: "usuario_id",
      },
      allowNull: false,
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
  await queryInterface.dropTable("casos");
}
