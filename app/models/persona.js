/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class Persona extends Model {
    static associate(models) {
      this.hasOne(models.empleado, {foreignKey: "persona_id"});
    }
  }
  Persona.init({
    /* uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDv4,
    },*/
    persona_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    nro_documento: Sequelize.STRING,
    tip_documento:
      // eslint-disable-next-line new-cap
      Sequelize.ENUM("CI", "RUC", "Cédula Extranjera", "Pasaporte"),
  }, {
    sequelize,
    modelName: "persona",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Persona;
};
