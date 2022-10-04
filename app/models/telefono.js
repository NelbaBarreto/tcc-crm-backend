/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Telefono extends Model {
    static associate(models) {}
  }
  Telefono.init({
    telefono_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    referencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo:
      // eslint-disable-next-line new-cap
      Sequelize.ENUM("Laboral", "Particular", "Familiar"),
    principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    interno: DataTypes.INTEGER,
    numero: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    prefijo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    usu_insercion: DataTypes.STRING,
    usu_modificacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "telefono",
    tableName: "telefonos",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Telefono;
};
