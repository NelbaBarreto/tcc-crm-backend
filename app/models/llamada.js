/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Llamada extends Model {
    static associate(models) {}
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
    },
    descripcion: DataTypes.TEXT,
    estado:
      // eslint-disable-next-line new-cap, max-len
      Sequelize.ENUM("Pendiente", "Asignado", "En curso", "Cancelado", "Finalizado"),
    tipo:
      // eslint-disable-next-line new-cap, max-len
      Sequelize.ENUM("Entrante", "Saliente"),
    fec_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "llamada",
    tableName: "llamadas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  Llamada.estados = Llamada.getAttributes().estado?.values;
  Llamada.tipos = Llamada.getAttributes().tipo?.values;
  return Llamada;
};
