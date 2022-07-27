/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(_models) {
    }
  }
  Empleado.init({
    empleado_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    persona_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "usuarios",
        },
        key: "usuario_id",
      },
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: "empleados",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Empleado;
};
