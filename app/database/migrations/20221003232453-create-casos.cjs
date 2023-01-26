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
      comment: "Prioridad del caso.",
      allowNull: false,
    },
    estado: {
      type: Sequelize.ENUM("Pendiente", "En Proceso", "Cancelado",
          "Finalizado"),
      comment: "Estado del caso.",
      allowNull: false,
    },
    tipo: {
      comment: "Tipo de caso.",
      type: Sequelize.ENUM("Solicitud", "Queja", "Sugerencia", "Otro"),
    },
    origen: {
      comment: "Origen del caso.",
      type: Sequelize.ENUM("Redes Sociales", "Página Web", "Llamada", "Correo",
          "Otro"),
      allowNull: false,
    },
    solucion: {
      comment: "Descripción de como se solucionó el caso.",
      type: Sequelize.STRING,
    },
    contacto_id: {
      comment: "Id de contacto para el caso.",
      type: Sequelize.INTEGER,
    },
    lead_id: {
      comment: "Id del lead para el caso.",
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable("casos");
}
