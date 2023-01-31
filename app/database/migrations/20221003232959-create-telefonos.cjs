/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("telefonos", {
    telefono_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      comment: "Identificador único del teléfono.",
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
    sede_id: {
      type: Sequelize.INTEGER,
      comment: "Id de la sede a la que pertenece el teléfono.",
      references: {
        model: {
          tableName: "sedes",
        },
        key: "sede_id",
      },
      allowNull: true,
    },
    tipo: {
      type: Sequelize.ENUM("Móvil", "Casa", "Laboral", "Otro"),
      comment: "Tipo de teléfono.",
      allowNull: false,
    },
    principal: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si el teléfono es o no el principal en el sistema.",
    },
    numero: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: "Número de teléfono.",
    },
    comentario: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "Comentario adicional acerca del teléfono.",
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
  await queryInterface.dropTable("telefonos");
}

