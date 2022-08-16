/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasOne(models.empleado, {foreignKey: "empleado_id"});
    }
  }
  Usuario.init({
    usuario_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nom_usuario: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    activo: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: "usuario",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSaltSync(10);
          usuario.password = bcrypt.hashSync(usuario.password, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSaltSync(10);
          usuario.password = bcrypt.hashSync(usuario.password, salt);
        }
      },
    },
    instanceMethods: {
      validPassword: (user_password) => {
        return bcrypt.compareSync(password, user_password);
      },
    },
  });

  Usuario.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  return Usuario;
};
