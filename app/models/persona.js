/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(_models) {
      /* Persona.hasOne(models.Empleado, {
        foreignKey: "persona_id",
      }); */
    }
  }
  Persona.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "personas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Persona;
};
