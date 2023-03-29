/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Tarea extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usuario"});
      this.belongsTo(models.contacto, {foreignKey: "contacto_id"});
      this.belongsTo(models.lead, {foreignKey: "lead_id"});
    }
  }
  Tarea.init({
    tarea_id: {
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
          msg: "No dejar vacio Asunto, es un campo Obligatorio.",
        },
        len: {
          args: [3, 255],
          msg: "El asunto debe tener entre 3 y 20 caracteres.",
        },
      },
    },
    descripcion: DataTypes.TEXT,
    estado: {
      type: DataTypes.ENUM("Pendiente", "En Curso", "Cancelado", "Finalizado"),
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
    prioridad: {
      type: DataTypes.ENUM("Alta", "Media", "Baja"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Prioridad, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Prioridad, es un campo Obligatorio.",
        },
      },
    },
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
      validate: {
        notNull: {
          msg: "Completar Usuario Asignado, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Usuario Asignado, es un campo Obligatorio.",
        },
      },
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
    fec_inicio: {
      type: DataTypes.DATE,
      validate: {
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
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "tarea",
    tableName: "tareas",
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

  Tarea.estados = Tarea.getAttributes().estado?.values.map((estado) =>
    ({value: estado, label: estado})); ;

  Tarea.prioridades = Tarea.getAttributes().prioridad?.values.map((prioridad) =>
    ({value: prioridad, label: prioridad})); ;
  return Tarea;
};
