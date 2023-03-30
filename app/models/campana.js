/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Campana extends Model {
    static associate(models) {
      this.hasMany(models.lead, {foreignKey: "lead_id"});
      this.hasMany(models.oportunidad, {foreignKey: "oportunidad_id"});
    }
  }
  Campana.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Nombre, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Nombre, es un campo Obligatorio.",
        },
        len: {
          args: [3, 255],
          msg: "El nombre debe tener entre 3 y 20 caracteres.",
        },
      },
    },
    campana_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    fec_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Fecha inicio, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Fecha inicio, es un campo Obligatorio.",
        },
        isValidDate: async function(value) {
          const hoy = new Date();
          const fecha_incio = new Date(value);
          hoy.setHours(0, 0, 0, 0);

          if (fecha_incio < hoy) {
            throw new Error("Fecha Inicio: No se puede ingresar" +
            " una fecha menor a la fecha actual.");
          }
          return true;
        },
      },
    },
    fec_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Fecha fin, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Fecha fin, es un campo Obligatorio.",
        },
      },
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "campana",
    tableName: "campanas",
    validate: {
      fecFinMayorFecInicio() {
        if (this.fec_fin <= this.fec_inicio) {
          throw new Error("Fecha Fin:" +
          " La fecha fin debe ser mayor a la fecha de inicio.");
        }
      },
    },
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Campana;
};
