/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class Encuesta_Pregunta extends Model {
    static associate(_models) {
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
  }, {
    sequelize,
    modelName: "encuesta_pregunta",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Encuesta_Pregunta;
};
