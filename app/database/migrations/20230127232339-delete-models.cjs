/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, _Sequelize) {
  await queryInterface.dropTable("campana_tipos");
  await queryInterface.removeColumn("ciclo_profesores", "aula_id");
  await queryInterface.dropTable("ciclo_aulas");
  await queryInterface.removeColumn("direcciones", "ciudad_id");
  await queryInterface.dropTable("ciudades");
  await queryInterface.dropTable("paises");
  await queryInterface.dropTable("roles");
  await queryInterface.dropTable("tip_campanas");
}
export async function down(_queryInterface, _Sequelize) {
  // await queryInterface.createTable();
}
