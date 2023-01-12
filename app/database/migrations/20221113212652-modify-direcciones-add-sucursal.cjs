/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "direcciones", // table name
      "sucursal_id", // new field name
      {
        type: Sequelize.INTEGER,
        comment: "Id de la sucursal al que pertenece la dirección.",
        references: {
          model: {
            tableName: "sucursales",
          },
          key: "sucursal_id",
        },
        allowNull: true,
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("direcciones", "sucursal_id");
}

