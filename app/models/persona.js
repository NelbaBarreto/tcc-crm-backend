/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class Persona extends Model {
    static associate(models) {
      this.hasOne(models.empleado, {foreignKey: "persona_id"});
      this.hasMany(models.direccion,
          {foreignKey: "persona_id", as: "direcciones"});
      this.hasMany(models.telefono,
          {foreignKey: "persona_id", as: "telefonos"});
    }
  }
  Persona.init({
    persona_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Nombre, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Nombre, es un campo Obligatorio.",
        },
        len: {
          args: [3, 255],
          msg: "El nombre debe tener entre 3 y 20 caracteres.",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Completar Email, es un campo Obligatorio.",
        },
        notEmpty: {
          msg: "No dejar vacio Email, es un campo Obligatorio.",
        },
        len: {
          args: [3, 255],
          msg: "El nombre debe tener entre 3 y 20 caracteres.",
        },
      },
    },
    nro_documento: Sequelize.STRING,
    tip_documento: Sequelize.ENUM("CI", "RUC",
        "Cédula Extranjera", "Pasaporte"),
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "persona",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  Persona.tip_documentos =
  Persona.getAttributes().tip_documento?.values.map((tip_documento) =>
    ({value: tip_documento, label: tip_documento}));

  return Persona;
};
