/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "llamadas", // table name
      "usu_asignado_id", // new field name
      {
        type: Sequelize.INTEGER,
        comment: "Id de usuario asignado.",
        references: {
          model: {
            tableName: "usuarios",
          },
          key: "usuario_id",
        },
        allowNull: true,
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("llamadas", "usu_asignado_id");
}

