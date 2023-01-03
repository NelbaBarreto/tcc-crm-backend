/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class EncuestaPreguntaRespuesta extends Model {
    static associate(models) {
      this.belongsTo(models.encuesta_pregunta,
          {foreignKey: "pregunta_id", as: "pregunta"});
    }
  }
  EncuestaPreguntaRespuesta.init({
    pregunta_respuesta_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    respuesta_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "encuesta_respuestas",
        },
        key: "respuesta_id",
      },
      allowNull: false,
    },
    pregunta_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "encuesta_preguntas",
        },
        key: "pregunta_id",
      },
      allowNull: false,
    },
    respuesta: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: "encuesta_pregunta_respuesta",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return EncuestaPreguntaRespuesta;
};
