/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class Encuesta_Pregunta_Opcion extends Model {
    static associate(models) {
      this.belongsTo(models.encuesta_pregunta,
          {foreignKey: "pregunta_id"});
    }
  }
  Encuesta_Pregunta_Opcion.init({
    opcion_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
    etiqueta: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    valor: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    tableName: "encuesta_pregunta_opciones",
    modelName: "encuesta_pregunta_opcion",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return Encuesta_Pregunta_Opcion;
};
