/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Ciclo_Aulas", {
    aula_id: {
      comment: "Identificador único del aula.",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    hor_inicio: {
      comment: "Hora de inicio de la clase.",
      type: Sequelize.TIME,
      allowNull: false,
    },
    hor_fin: {
      comment: "Hora de fin de la clase.",
      type: Sequelize.TIME,
      allowNull: false,
    },
    dias: {
      comment: "Días en los que se desarrollan las clases.",
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    cupo_total: {
      comment: "Cantidad tope de alumnos.",
      type: Sequelize.INTEGER,
    },
    sede_id: {
      type: Sequelize.INTEGER,
      comment: "Sede en la que está ubicada el aula.",
      references: {
        model: {
          tableName: "sedes",
        },
        key: "sede_id",
      },
      allowNull: false,
    },
    ciclo_id: {
      type: Sequelize.INTEGER,
      comment: "Ciclo para el cual va a ser utilizado el aula.",
      references: {
        model: {
          tableName: "curso_ciclos",
        },
        key: "ciclo_id",
      },
      allowNull: false,
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
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Ciclo_Aulas");
}
