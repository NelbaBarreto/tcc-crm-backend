/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class Encuesta_Pregunta extends Model {
    static associate(models) {
      this.hasMany(models.encuesta_pregunta_opcion,
          {foreignKey: "pregunta_id", as: "opciones"});
    }
  }
  Encuesta_Pregunta.init({
    pregunta_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    pregunta: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    obligatorio: {
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
  }, {
    sequelize,
    tableName: "encuesta_preguntas",
    modelName: "encuesta_pregunta",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Encuesta_Pregunta;
};
