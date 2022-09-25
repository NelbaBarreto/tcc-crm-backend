'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("campanas", {
      campana_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Identificador único de la campana.",
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      fec_inicio: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "fec_inicio",
        comment: "Fecha de inicio de la campana.",
      },
      fec_fin: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "fec_fin",
        comment: "Fecha del fin de la campana.",
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
    await queryInterface.dropTable("campanas");
  }