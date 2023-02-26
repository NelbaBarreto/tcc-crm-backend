/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("telefonos", "sede_id");
  await queryInterface.removeColumn("direcciones", "sede_id");
  await queryInterface.removeColumn("curso_ciclos", "sede_id");
  await queryInterface.dropTable("sedes");
}
export async function down(_queryInterface, _Sequelize) {
  // await queryInterface.createTable();
}
