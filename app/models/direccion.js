/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import Sequelize, {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Direccion extends Model {
    static associate(models) {
      this.belongsTo(models.persona, {foreignKey: "persona_id"});
    }
  }
  Direccion.init({
    direccion_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    persona_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: true,
    },
    referencia: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    calle_1: Sequelize.STRING,
    calle_2: Sequelize.STRING,
    cod_postal: Sequelize.STRING,
    tipo: Sequelize.ENUM("Laboral", "Particular", "Otro"),
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "direccion",
    tableName: "direcciones",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
  });

  Direccion.tipos = Direccion.getAttributes().tipo?.values.map((tipo) =>
    ({value: tipo, label: tipo}));

  return Direccion;
};
