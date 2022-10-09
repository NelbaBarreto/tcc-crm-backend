/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("ciudades", {
    ciudad_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Identificador único de la ciudad.",
      type: Sequelize.INTEGER,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "Nombre de la ciudad.",
    },
    pais_id: {
      type: Sequelize.INTEGER,
      comment: "Id del país al que pertenece la ciudad.",
      references: {
        model: {
          tableName: "paises",
        },
        key: "pais_id",
      },
      allowNull: false,
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
  await queryInterface.dropTable("ciudades");
}
