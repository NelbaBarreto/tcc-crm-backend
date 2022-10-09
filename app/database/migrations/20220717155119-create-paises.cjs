/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";
// eslint-disable-next-line require-jsdoc
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("paises", {
    pais_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      comment: "Identificador único del país.",
    },
    nombre: {
      type: Sequelize.STRING,
      comment: "Nombre del país.",
      allowNull: false,
      unique: {
        args: true,
        msg: "El país ya existe.",
      },
    },
    nom_corto: {
      type: Sequelize.STRING(10),
      comment: "Nombre corto del país.",
      allowNull: false,
      unique: {
        args: true,
        msg: "Nombre corto de país ya existe.",
      },
    },
    cod_telefono: {
      type: Sequelize.STRING(10),
      comment: "Prefijo para llamadas internacionales.",
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
  await queryInterface.dropTable("paises");
}
