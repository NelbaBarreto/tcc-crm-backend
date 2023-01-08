/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
      "leads", // table name
      "curso_id", // new field name
      {
        type: Sequelize.INTEGER,
        comment: "Id del curso en el que está interesado el lead.",
        references: {
          model: {
            tableName: "cursos",
          },
          key: "curso_id",
        },
        allowNull: false,
      });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.removeColumn("leads", "curso_id");
}

