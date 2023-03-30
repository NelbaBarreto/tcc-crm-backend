/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Llamada extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usuario"});
      this.belongsTo(models.contacto, {foreignKey: "contacto_id"});
      this.belongsTo(models.lead, {foreignKey: "lead_id"});
    }
  }
  Llamada.init({
    llamada_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    asunto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Asunto, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacío Asunto, es un campo Obligatorio.",
        },
        len: {
          args: [3, 255],
          msg: "El asunto debe tener entre 3 y 255 caracteres.",
        },
      },
    },
    descripcion: DataTypes.TEXT,
    estado: {
      type: DataTypes.ENUM("Pendiente", "Finalizado", "Cancelado"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Estado, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Estado, es un campo Obligatorio.",
        },
      },
    },
    tipo: {
      type: DataTypes.ENUM("Entrante", "Saliente"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Estado, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Estado, es un campo Obligatorio.",
        },
      },
    },
    fec_inicio: {
      type: DataTypes.DATE,
    },
    contacto_id: {
      comment: "Id de contacto para el caso.",
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "contactos",
        },
        key: "contacto_id",
      },
      allowNull: true,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "leads",
        },
        key: "lead_id",
      },
      allowNull: true,
    },
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (instance, _options) => {
        const hoy = new Date();
        const fec_inicio = new Date(instance.fec_inicio);
        hoy.setHours(0, 0, 0, 0);
        if (fec_inicio < hoy) {
          throw new Error("Fecha: No se puede ingresar" +
                " una fecha menor a la fecha actual.");
        }
      },
    },
    sequelize,
    modelName: "llamada",
    tableName: "llamadas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  Llamada.estados = Llamada.getAttributes().estado?.values.map((estado) =>
    ({value: estado, label: estado}));

  Llamada.tipos = Llamada.getAttributes().tipo?.values.map((tipo) =>
    ({value: tipo, label: tipo}));
  return Llamada;
};
