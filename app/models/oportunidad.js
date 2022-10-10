/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Oportunidad extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usuario"});
      this.belongsTo(models.campana, {foreignKey: "campana_id", as: "campana"});
    }
  }
  Oportunidad.init({
    oportunidad_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    etapa:
      // eslint-disable-next-line new-cap, max-len
      Sequelize.ENUM("Pendiente", "Asignado", "En curso", "Cancelado", "Finalizado"),
    campana_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "campana",
        key: "campana_id",
      },
    },
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    usu_insercion: DataTypes.STRING(20),
    usu_modificacion: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: "oportunidad",
    tableName: "oportunidades",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Oportunidad;
};
