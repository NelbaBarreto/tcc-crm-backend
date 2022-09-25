/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Campana_tipo extends Model {
    static associate(models) {
      this.belongsTo(models.campana, {foreignKey: "campana_id", as: "campana"});
    }
  }
  Campana_tipo.init({
    campana_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "campana",
        key: "campana_id",
      },
    },
    tip_campana_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "campana_tipo",
    tableName: "campana_tipos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Campana_tipo;
};
