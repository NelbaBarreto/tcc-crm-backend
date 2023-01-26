/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class EncuestaPreguntaRespuesta extends Model {
    static associate(models) {
      this.belongsTo(models.encuesta_pregunta,
          {foreignKey: "pregunta_id", as: "pregunta"});
      this.belongsTo(models.encuesta_respuesta,
          {foreignKey: "respuesta_id", as: "respuestas"});
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
    valor: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    valor_texto: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
  }, {
    sequelize,
    modelName: "encuesta_pregunta_respuesta",
    tableName: "encuesta_pregunta_respuestas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return EncuestaPreguntaRespuesta;
};
