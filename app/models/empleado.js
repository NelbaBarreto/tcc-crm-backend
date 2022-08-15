/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class Empleado extends Model {
    static associate(models) {
      this.belongsTo(models.usuario, {foreignKey: "usuario_id"});
      this.belongsTo(models.persona, {foreignKey: "persona_id"});
    }
  }
  Empleado.init({
    empleado_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    activo: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    persona_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "persona",
        key: "persona_id",
      },
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
  }, {
    sequelize,
    modelName: "empleado",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  return Empleado;
};
