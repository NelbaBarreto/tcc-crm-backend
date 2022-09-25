/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Direccion extends Model {
    static associate(models) {
      this.belongsTo(models.ciudad, {foreignKey: "ciudad_id", as: "ciudad"});
      this.belongsTo(models.persona, {foreignKey: "referencia_id"});
    }
  }
  Direccion.init({
    direccion_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    principal: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    persona_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "persona",
        key: "referencia_id",
      },
    },
    calle_1: Sequelize.STRING,
    calle_2: Sequelize.STRING,
    descripcion: Sequelize.TEXT,
    tip_referencia:
      // eslint-disable-next-line new-cap
      Sequelize.ENUM("persona", "sucursal"),
    tipo:
      // eslint-disable-next-line new-cap
      Sequelize.ENUM("laboral", "particular"),
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "direccion",
    tableName: "direcciones",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Direccion;
};
