/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "oportunidades", // table name
      "encuesta", // new field name
      {
        type: Sequelize.BOOLEAN,
        comment: "Indica si la encuesta de satisfacción" +
        "asociada ya fue completada.",
        defaultValue: false,
        allowNull: true,
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("oportunidades", "encuesta");
}

