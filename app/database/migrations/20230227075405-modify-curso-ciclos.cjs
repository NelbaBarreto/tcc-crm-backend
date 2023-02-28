/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "curso_ciclos", // table name
      "codigo", // new field name
      {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        comment: "Identificador del ciclo.",
      });
  await queryInterface.addColumn(
      "curso_ciclos", // table name
      "detalles", // new field name
      {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Información adicional sobre el ciclo.",
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("curso_ciclos", "codigo");
  await queryInterface.removeColumn("curso_ciclos", "detalles");
}
