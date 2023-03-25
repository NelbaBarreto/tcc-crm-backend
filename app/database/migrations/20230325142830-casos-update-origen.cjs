/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  // Hacer drop de la columna con el enum
  await queryInterface.removeColumn("casos", "origen");
  await queryInterface.sequelize.query('DROP TYPE "enum_casos_origen";');

  // Recrear la columna con un enum con los nuevos valores
  await queryInterface.addColumn("casos", "origen", {
    type: Sequelize.ENUM("Facebook", "Instagram", "Twitter",
        "WhatsApp", "Página Web", "Llamada", "Correo", "Evento", "Otro"),
    allowNull: false,
    defaultValue: "Otro",
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("casos", "origen");
  await queryInterface.sequelize.query('DROP TYPE "enum_casos_origen";');

  await queryInterface.addColumn("casos", "origen", {
    type: Sequelize.ENUM("Redes Sociales", "Página Web",
        "Llamada", "Correo", "Evento", "Otro"),
    allowNull: false,
    defaultValue: "Otro",
  });
}
