/* eslint-disable require-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(_models) {
      // define association here
    }
  }
  Usuario.init({
    usuario_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nom_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "usuarios",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Usuario;
};
