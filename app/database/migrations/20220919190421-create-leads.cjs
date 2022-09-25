'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Leads", {
    lead_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    estado: {
      type: Sequelize.ENUM("activo", "inactivo","contactado"),
      comment: "Estado del lead",
    },
    usu_asginado_id: {
      type: Sequelize.INTEGER,
      comment: "Id de usuario asginado.",
      references: {
        model: {
          tableName: "usuarios",
        },
        key: "usuario_id",
      },
      allowNull: false,
    },
    campana_id: {
      type: Sequelize.INTEGER,
      comment: "Id de campaña del lead.",
      allowNull: false,
    },
    origen: {
      type: Sequelize.ENUM("Correo", "llamada","Red Social"),
      comment: "Origen del lead",
    },
    persona_id: {
      type: Sequelize.INTEGER,
      comment: "Id de persona del lead.",
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: false,
    },
    curso_id: {
      type: Sequelize.INTEGER,
      comment: "Id del curso del lead.",
      allowNull: false,
    },
    //Auditoria
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
  await queryInterface.dropTable("Leads");
}