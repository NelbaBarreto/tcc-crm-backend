/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("telefonos", {
    telefono_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    referencia_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: Sequelize.ENUM("Laboral", "Particular", "Familiar"),
      comment: "Tipo de Telefono",
      allowNull: false,
    },
    principal: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    interno: {
      type: Sequelize.INTEGER,
    },
    numero: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    prefijo: {
      type: Sequelize.STRING(10),
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
  await queryInterface.dropTable("telefonos");
}

