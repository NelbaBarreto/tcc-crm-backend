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
    }
  }
  Caso.init({
    caso_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    asunto: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    prioridad: DataTypes.ENUM("Alta", "Media", "Baja"),
    estado: DataTypes.ENUM("Nuevo", "Asignado", "En Proceso", "Cancelado",
        "Finalizado"),
    tipo: DataTypes.ENUM("Solicitud", "Queja", "Sugerencia", "Otro"),
    solucion: DataTypes.STRING,
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
    origen: DataTypes.ENUM("Redes Sociales", "Página Web", "Llamada", "Correo",
        "Otro"),
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "caso",
    tableName: "casos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  Caso.estados = Caso.getAttributes().estado?.values;
  Caso.origenes = Caso.getAttributes().origen?.values;
  Caso.tipos = Caso.getAttributes().tipo?.values;
  Caso.prioridades = Caso.getAttributes().prioridad?.values;
  return Caso;
};
