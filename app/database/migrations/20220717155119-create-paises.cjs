/* eslint-disable require-jsdoc */
"use strict";
// eslint-disable-next-line require-jsdoc
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Paises", {
    pais_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      comment: "Identificador único del país.",
    },
    nombre: {
      type: Sequelize.STRING,
      comment: "Nombre del país.",
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
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("paises");
}
