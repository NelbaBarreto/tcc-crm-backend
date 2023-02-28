/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "oportunidades", // table name
      "ciclo_id", // new field name
      {
        type: Sequelize.INTEGER,
        comment: "Id del ciclo en el que está interesado el contacto.",
        references: {
          model: {
            tableName: "curso_ciclos",
          },
          key: "ciclo_id",
        },
        allowNull: true,
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("oportunidades", "ciclo_id");
}
