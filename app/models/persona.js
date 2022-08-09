/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(models) {
      this.hasOne(models.empleados);
    }
  }
  Persona.init({
    /* uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDv4,
    },*/
    persona_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    nro_documento: DataTypes.STRING,
    cod_tip_documento:
      // eslint-disable-next-line new-cap
      DataTypes.ENUM("CI", "RUC", "Cédula Extranjera", "Pasaporte"),
  }, {
    sequelize,
    modelName: "personas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Persona;
};
