/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Campana extends Model {
    static associate(models) {

    }
  }
  Campana.init({
    nombre: Sequelize.STRING,
    campana_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    fec_inicio: Sequelize.DATE,
    fec_fin: Sequelize.DATE,

    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "campana",
    tableName: "campanas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Campana;
};
