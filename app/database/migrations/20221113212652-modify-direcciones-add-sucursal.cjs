/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "direcciones", // table name
      "sede_id", // new field name
      {
        type: Sequelize.INTEGER,
        comment: "Id de la sede al que pertenece la dirección.",
        references: {
          model: {
            tableName: "sedes",
          },
          key: "sede_id",
        },
        allowNull: true,
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("direcciones", "sede_id");
}

