/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Direccion extends Model {
    static associate(models) {
      this.belongsTo(models.ciudad, {foreignKey: "ciudad_id", as: "ciudad"});
      this.belongsTo(models.persona, {foreignKey: "persona_id"});
      this.belongsTo(models.sucursal, {foreignKey: "sucursal_id"});
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
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: true,
    },
    calle_1: Sequelize.STRING,
    calle_2: Sequelize.STRING,
    referencia: Sequelize.TEXT,
    ciudad_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "ciudades",
        },
        key: "ciudad_id",
      },
      allowNull: false,
    },
    tipo: Sequelize.ENUM("laboral", "particular"),
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "direccion",
    tableName: "direcciones",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  Direccion.tipos = Direccion.getAttributes().tipo?.values;
  return Direccion;
};
