/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("cursos", {
    curso_id: {
      comment: "Identificador único del curso.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nombre: {
      comment: "Nombre del curso.",
      type: Sequelize.STRING,
      allowNull: false,
    },
    descripcion: {
      comment: "Reseña del curso.",
      type: Sequelize.TEXT,
    },
    usu_insercion: {
      // allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que insertó el registro.",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "fec_insercion",
      comment: "Fecha en la que se creó el registro.",
      defaultValue: Date.now(),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "fec_modificacion",
      comment: "Fecha en la que se modificó el registro por última vez.",
      defaultValue: Date.now(),
    },
    usu_modificacion: {
      // allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que modificó el registro por última vez.",
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("cursos");
}
