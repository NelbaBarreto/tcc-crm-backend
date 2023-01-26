/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Llamada extends Model {
    static associate(models) {
      this.hasMany(models.contacto, {foreignKey: "lead_id"});
      this.hasMany(models.lead, {foreignKey: "lead_id"});
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
    },
    descripcion: DataTypes.TEXT,
    estado: {
      type: DataTypes.ENUM("Pendiente", "En Proceso", "Cancelado",
          "Finalizado"),
    },
    tipo:
      Sequelize.ENUM("Entrante", "Saliente"),
    fec_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contacto_id: DataTypes.INTEGER,
    lead_id: DataTypes.INTEGER,
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
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
