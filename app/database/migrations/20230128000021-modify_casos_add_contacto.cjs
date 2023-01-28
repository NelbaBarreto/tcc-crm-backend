/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "casos", // table name
      "contacto_id", // new field name
      {
        type: Sequelize.INTEGER,
        comment: "Id de contacto para el caso.",
        references: {
          model: {
            tableName: "contactos",
          },
          key: "contacto_id",
        },
        allowNull: true,
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("casos", "contacto_id");
}

