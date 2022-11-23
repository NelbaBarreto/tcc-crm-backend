/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Telefono extends Model {
    static associate(models) {
      this.belongsTo(models.persona, {foreignKey: "persona_id"});
      this.belongsTo(models.sucursal, {foreignKey: "sucursal_id"});
    }
  }
  Telefono.init({
    telefono_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: Sequelize.ENUM("Móvil", "Casa", "Laboral", "Otro"),
    principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: false,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: false,
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

  Telefono.tipos = Telefono.getAttributes().tipo?.values;
  return Telefono;
};