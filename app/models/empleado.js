/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(models) {
      Empleado.belongsTo(models.Persona, {
        foreignKey: "persona_id",
      });
    }
  }
  Empleado.init({
    activo: {
      type: DataTypes.INTEGER,
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
  }, {
    sequelize,
    modelName: "empleados",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Empleado;
};
