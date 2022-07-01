/* eslint-disable require-jsdoc */
import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(_models) {
      // define association here
    }
  }
  Usuario.init({
    usuario_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nom_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: "usuarios",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          usuario.password = bcrypt.hashSync(usuario.password, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          usuario.password = bcrypt.hashSync(usuario.password, salt);
        }
      },
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, password);
      },
    },
  });

  Usuario.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  return Usuario;
};
