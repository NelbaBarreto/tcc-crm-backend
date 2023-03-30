/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Caso extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usuario"});
      this.belongsTo(models.contacto, {foreignKey: "contacto_id"});
      this.belongsTo(models.lead, {foreignKey: "lead_id"});
    }
  }
  Caso.init({
    caso_id: {
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
    estado: {
      type: DataTypes.ENUM("Pendiente", "En Curso", "Cancelado",
          "Finalizado"),
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
      type: DataTypes.ENUM("Solicitud", "Queja", "Sugerencia", "Otro"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Tipo, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Tipo, es un campo Obligatorio.",
        },
      },
    },
    solucion: DataTypes.STRING,
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuario",
        key: "usuario_id",
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
    origen: {
      type: DataTypes.ENUM("Facebook", "Instagram", "Twitter",
          "WhatsApp", "Página Web", "Llamada", "Correo", "Evento", "Otro"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Origen, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Origen, es un campo Obligatorio.",
        },
      },
    },
    contacto_id: DataTypes.INTEGER,
    lead_id: DataTypes.INTEGER,
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "caso",
    tableName: "casos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  Caso.estados = Caso.getAttributes().estado?.values.map((estado) =>
    ({value: estado, label: estado}));

  Caso.origenes = Caso.getAttributes().origen?.values.map((origen) =>
    ({value: origen, label: origen}));

  Caso.tipos = Caso.getAttributes().tipo?.values.map((tipo) =>
    ({value: tipo, label: tipo}));

  Caso.prioridades = Caso.getAttributes().prioridad?.values.map((prioridad) =>
    ({value: prioridad, label: prioridad}));
  return Caso;
};
