/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

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
    },
    descripcion: DataTypes.TEXT,
    estado:
      Sequelize.ENUM("Pendiente", "En Curso", "Cancelado", "Finalizado"),
    prioridad:
      Sequelize.ENUM("Alta", "Media", "Baja"),
    usu_asignado_id: {
      type: DataTypes.INTEGER,
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
    fec_inicio: {
      type: DataTypes.DATE,
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
    hooks: {
      beforeCreate: (instance, _options) => {
        const hoy = new Date();
        const fec_inicio = new Date(instance.fec_inicio);
        hoy.setHours(0, 0, 0, 0);
        if (fec_inicio < hoy) {
          throw new Error("No se puede ingresar" +
                " una fecha menor a la fecha actual.");
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
