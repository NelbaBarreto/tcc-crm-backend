/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";

import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usuario"});
      this.belongsTo(models.persona, {foreignKey: "persona_id", as: "persona"});
    }
  }
  Lead.init({
    lead_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    estado:
      // eslint-disable-next-line new-cap
      Sequelize.ENUM("Nuevo", "Asignado", "En Proceso",
          "Convertido", "Perdido"),
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
    campana_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    origen: Sequelize.ENUM("Redes Sociales", "Página Web", "Llamada", "Correo",
        "Evento", "Otro"),
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "persona",
        key: "persona_id",
      },
    },
    usu_insercion: DataTypes.STRING(20),
    usu_modificacion: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: "lead",
    tableName: "leads",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  Lead.estados = Lead.getAttributes().estado?.values;
  Lead.origenes = Lead.getAttributes().origen?.values;
  return Lead;
};
