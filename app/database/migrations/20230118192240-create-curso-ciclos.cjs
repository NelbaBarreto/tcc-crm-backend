/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("curso_ciclos", {
    ciclo_id: {
      comment: "Identificador único del ciclo.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    curso_id: {
      type: Sequelize.INTEGER,
      comment: "Id del curso al que pertenece el ciclo.",
      references: {
        model: {
          tableName: "cursos",
        },
        key: "curso_id",
      },
      allowNull: false,
    },
    nivel: {
      comment: "Nivel del curso (Básico, Intermedio, Avanzado, etc).",
      type: Sequelize.STRING(50),
    },
    sede_id: {
      type: Sequelize.INTEGER,
      comment: "Sede en la que se va a desarrollar el ciclo",
      references: {
        model: {
          tableName: "sedes",
        },
        key: "sede_id",
      },
      allowNull: true,
    },
    fec_inicio: {
      comment: "Fecha en la que inicia el ciclo.",
      type: Sequelize.DATE,
    },
    fec_fin: {
      comment: "Fecha de finalización del ciclo.",
      type: Sequelize.DATE,
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
      allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que modificó el registro por última vez.",
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("curso_ciclos");
}

