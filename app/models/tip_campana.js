/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Tip_campana extends Model {
    static associate(models) {
      this.hasMany(models.campana_tipo, {foreignKey: "tip_campana_id"});
    }
  }
  Tip_campana.init({
    tipo_campana_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    activo: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    nombre: Sequelize.STRING,
    
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "tip_campana",
    tableName: "tip_campanas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Tip_campana;
};
