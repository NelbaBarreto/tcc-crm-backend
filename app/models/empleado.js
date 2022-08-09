/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(models) {
      this.belongsTo(models.usuarios, {foreignKey: "usuario_id", as: "usuario"});
      this.belongsTo(models.personas, {foreignKey: "persona_id", as: "persona"});
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
      allowNull: false,
      references: {
        model: "personas",
        key: "persona_id",
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "usuario_id",
      },
    },
  }, {
    sequelize,
    modelName: "empleados",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  return Empleado;
};
