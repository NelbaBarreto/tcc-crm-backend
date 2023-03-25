/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  // Hacer drop de la columna con el enum
  await queryInterface.removeColumn("leads", "estado");
  await queryInterface.sequelize.query('DROP TYPE "enum_leads_estado";');

  // Recrear la columna con un enum con los nuevos valores
  await queryInterface.addColumn("leads", "estado", {
    type: Sequelize.ENUM("Pendiente", "En Proceso", "Convertido",
        "Perdido", "Anulado"),
    allowNull: false,
    defaultValue: "Pendiente",
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("leads", "estado");
  await queryInterface.sequelize.query('DROP TYPE "enum_leads_estado";');
  await queryInterface.addColumn("leads", "estado", {
    type: Sequelize.ENUM("Pendiente", "En Proceso", "Convertido",
        "Perdido", "Archivado"),
    allowNull: false,
    defaultValue: "Pendiente",
  });
}
