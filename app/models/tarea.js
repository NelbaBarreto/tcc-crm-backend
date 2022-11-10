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
      // eslint-disable-next-line new-cap, max-len
      Sequelize.ENUM("Pendiente", "Asignado", "En curso", "Cancelado", "Finalizado"),
    prioridad:
      // eslint-disable-next-line new-cap, max-len
      Sequelize.ENUM("Alta", "Media", "Baja"),
    actividad_id: {
      type: DataTypes.INTEGER,
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
    fec_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
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
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  Tarea.estados = Tarea.getAttributes().estado?.values;
  Tarea.prioridades = Tarea.getAttributes().prioridad?.values;
  return Tarea;
};
