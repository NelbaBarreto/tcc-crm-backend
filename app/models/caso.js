/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

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
    nombre: DataTypes.STRING(120),
    descripcion: DataTypes.STRING,
    prioridad:
      // eslint-disable-next-line new-cap, max-len
      Sequelize.ENUM("Alta", "Media", "Baja"),
    estado:
      // eslint-disable-next-line new-cap, max-len
      Sequelize.ENUM("Pendiente", "Asignado", "En curso", "Cancelado", "Finalizado"),
    tipo: DataTypes.INTEGER,
    origen: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    solucion: DataTypes.STRING,
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
    campana_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origen:
      // eslint-disable-next-line new-cap
      Sequelize.ENUM("Correo", "llamada", "Red Social"),

    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "persona",
        key: "persona_id",
      },
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "caso",
    tableName: "casos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Caso;
};
