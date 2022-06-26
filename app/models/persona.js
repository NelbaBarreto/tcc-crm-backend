/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(_models) {
      // define association here
    }
  }
  Persona.init({
    persona_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    fec_eliminacion: DataTypes.DATE,
  }, {
    sequelize,
    modelName: "persona",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Persona;
};
