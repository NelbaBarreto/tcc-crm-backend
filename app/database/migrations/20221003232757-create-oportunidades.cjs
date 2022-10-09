/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

"use strict";


export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("oportunidades", {
    oportunidad_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nombre: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },
    campana_id: {
      type: Sequelize.INTEGER,
      comment: "Id de campana de la oportunidad.",
      references: {
        model: {
          tableName: "campanas",
        },
        key: "campana_id",
      },
      allowNull: false,
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
    valor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    etapa: {
      // eslint-disable-next-line max-len
      type: Sequelize.ENUM("Pendiente", "Asignado", "En curso", "Cancelado", "Finalizado"),
      comment: "etapas de una oportunidad",
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
  await queryInterface.dropTable("oportunidades");
}
