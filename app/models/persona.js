/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  Persona.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    fec_eliminacion: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'persona',
    createdAt: 'fec_insercion',
    updatedAt: 'fec_modificacion',
  });
  return Persona;
};
