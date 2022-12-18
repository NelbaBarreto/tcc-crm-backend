/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("direcciones", {
    direccion_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Identificador único de la dirección.",
      type: Sequelize.INTEGER,
    },
    calle_1: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "Calle principal.",
    },
    calle_2: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "Calle secundaria.",
    },
    persona_id: {
      type: Sequelize.INTEGER,
      comment: "Id de persona a la que pertenece la dirección.",
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: true,
    },
    cod_postal: {
      type: Sequelize.STRING(30),
      allowNull: true,
      comment: "Código postal de la dirección.",
    },
    tipo: {
      type: Sequelize.ENUM("Laboral", "Particular", "Otro"),
      comment: "Tipo de dirección",
    },
    referencia: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "Referencia a la dirección.",
    },
    ciudad_id: {
      type: Sequelize.INTEGER,
      comment: "Id de la ciudad al que pertenece la dirección.",
      references: {
        model: {
          tableName: "ciudades",
        },
        key: "ciudad_id",
      },
      allowNull: true,
    },
    principal: {
      type: Sequelize.BOOLEAN,
      comment: "Indica si la dirección es o no la principal en el sistema.",
      defaultValue: false,
      allowNull: false,
    },
    // Auditoria
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
  await queryInterface.dropTable("direcciones");
}
