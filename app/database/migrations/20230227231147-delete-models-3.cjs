/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, _Sequelize) {
  await queryInterface.dropTable("ciclo_profesores");
  await queryInterface.dropTable("profesores");
}
export async function down(_queryInterface, _Sequelize) {
  // await queryInterface.createTable();
}
