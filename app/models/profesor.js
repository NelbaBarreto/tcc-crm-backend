/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Profesor extends Model {
    static associate(models) {
      this.belongsTo(models.persona, {foreignKey: "persona_id", as: "persona"});
    }
  }
  Profesor.init({
    profesor_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
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
    modelName: "profesor",
    tableName: "profesores",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Profesor;
};
