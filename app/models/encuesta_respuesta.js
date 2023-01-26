/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";

export default (sequelize) => {
  class EncuestaRespuesta extends Model {
    static associate(models) {
      this.belongsTo(models.oportunidad, {foreignKey: "oportunidad_id"});
      this.belongsTo(models.contacto, {foreignKey: "contacto_id"});
      this.hasMany(models.encuesta_pregunta_respuesta,
          {foreignKey: "respuesta_id", as: "respuestas"});
    }
  }
  EncuestaRespuesta.init({
    respuesta_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    oportunidad_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "oportunidades",
        },
        key: "oportunidad_id",
      },
      allowNull: false,
    },
    contacto_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "contactos",
        },
        key: "contacto_id",
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "encuesta_respuesta",
    tableName: "encuesta_respuestas",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });
  return EncuestaRespuesta;
};
