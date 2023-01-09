/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Oportunidad extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usuario"});
      this.belongsTo(models.campana, {foreignKey: "campana_id"});
      this.hasOne(models.encuesta_respuesta, {foreignKey: "oportunidad_id"});
      this.belongsTo(models.contacto, {foreignKey: "contacto_id"});
      this.belongsTo(models.curso, {foreignKey: "curso_id"});
    }
  }
  Oportunidad.init({
    oportunidad_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    etapa: {
      type: DataTypes.ENUM("Abierto", "Ganado", "Perdido"),
    },
    campana_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "campanas",
        },
        key: "campana_id",
      },
    },
    contacto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "contactos",
        },
        key: "contacto_id",
      },
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "cursos",
        },
        key: "curso_id",
      },
    },
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    usu_insercion: DataTypes.STRING(20),
    usu_modificacion: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: "oportunidad",
    tableName: "oportunidades",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
    hooks: {
      afterSave: async (oportunidad) => {
        if (oportunidad.estado === "Ganado") {
          console.log(oportunidad.oportunidad_id);
        }
      },
    },
  });

  Oportunidad.etapas = Oportunidad.getAttributes().etapa?.values;

  return Oportunidad;
};
