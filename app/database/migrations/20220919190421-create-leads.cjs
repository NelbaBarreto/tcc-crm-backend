/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("leads", {
    lead_id: {
      comment: "Identificador único del lead.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    estado: {
      type: Sequelize.ENUM("Pendiente", "En Proceso", "Convertido", "Perdido"),
      comment: "Estado del lead.",
      // defaultValue: "Pendiente",
      allowNull: false,
    },
    usu_asignado_id: {
      type: Sequelize.INTEGER,
      comment: "Id del usuario asignado al lead.",
      references: {
        model: {
          tableName: "usuarios",
        },
        key: "usuario_id",
      },
      allowNull: true,
    },
    campana_id: {
      type: Sequelize.INTEGER,
      comment: "Campaña por la cual se consiguió el lead.",
      references: {
        model: {
          tableName: "campanas",
        },
        key: "campana_id",
      },
      allowNull: true,
    },
    origen: {
      type: Sequelize.ENUM("Redes Sociales", "Página Web", "Llamada", "Correo",
          "Evento", "Otro"),
      comment: "Origen del lead.",
      allowNull: false,
    },
    persona_id: {
      type: Sequelize.INTEGER,
      comment: "Id de persona del lead.",
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: false,
    },
    curso_id: {
      type: Sequelize.INTEGER,
      comment: "Id del curso del lead.",
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
  await queryInterface.dropTable("leads");
}
