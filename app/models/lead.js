/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usu_asignado"});
      this.belongsTo(models.persona, {foreignKey: "persona_id", as: "persona"});
      this.belongsTo(models.curso, {foreignKey: "curso_id"});
      this.belongsTo(models.campana, {foreignKey: "campana_id"});
      this.hasMany(models.tarea, {foreignKey: "lead_id"});
      this.hasMany(models.llamada, {foreignKey: "lead_id"});
      this.hasMany(models.caso, {foreignKey: "lead_id"});
    }
  }
  Lead.init({
    lead_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.ENUM("Pendiente", "En Proceso", "Convertido",
          "Perdido", "Anulado"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Estado campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio estado, es un campo Obligatorio.",
        },
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
    campana_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    curso_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "cursos",
        },
        key: "curso_id",
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Curso campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio curso, es un campo Obligatorio.",
        },
      },
    },
    origen: {
      type: DataTypes.ENUM("Facebook", "Instagram", "Twitter",
          "WhatsApp", "Página Web", "Llamada", "Correo", "Evento", "Otro"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Origen, campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio origen, es un campo Obligatorio.",
        },
      },
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "persona",
        key: "persona_id",
      },
    },
    usu_insercion: DataTypes.STRING(20),
    usu_modificacion: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: "lead",
    tableName: "leads",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  Lead.estados = Lead.getAttributes().estado?.values.map((estado) =>
    ({value: estado, label: estado}));

  Lead.origenes = Lead.getAttributes().origen?.values.map((origen) =>
    ({value: origen, label: origen})); ;
  return Lead;
};
