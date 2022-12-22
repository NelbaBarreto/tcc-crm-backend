/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";
import bcrypt from "bcrypt";
import {createTransport} from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import "dotenv/config.js";

export default (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasOne(models.empleado, {foreignKey: "empleado_id"});
      this.hasMany(models.lead, {foreignKey: "usu_asignado_id"});
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
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: Sequelize.STRING,
    usu_insercion: Sequelize.STRING,
    usu_modificacion: Sequelize.STRING,
  }, {
    sequelize,
    modelName: "usuario",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
    hooks: {
      beforeCreate: async (usuario) => {
        // eslint-disable-next-line max-len
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
          const randomNumber = Math.floor(Math.random() * chars.length);
          password += chars.substring(randomNumber, randomNumber +1);
        }
        if (password) {
          const salt = await bcrypt.genSaltSync(10);
          usuario.password = bcrypt.hashSync(password, salt);
        }
      },
      afterCreate: async (usuario) => {
        const usuarioJson = await Usuario.findByPk(usuario.usuario_id,
            {include: {all: true, nested: true}});          
       // Usuario.sendMail(usuarioJson?.toJSON(), 123);
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

  Usuario.sendMail = async (usuario, password) => {
    async function sendMail() {
      console.log("Sending mails...");
      const transporter = createTransport({
        service: "gmail",
        auth: {
          user: "barretonelba@gmail.com",
          pass: process.env.MAIL_PASS,
        },
      });

      // point to the template folder
      const handlebarOptions = {
        viewEngine: {
          partialsDir: path.resolve("./views/"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views/"),
      };

      // use a template file with nodemailer
      transporter.use("compile", hbs(handlebarOptions));

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "barretonelba@gmail.com",
        // to: usuario.email,
        to: "mendezale495@gmail.com",
        subject: "Nueva Cuenta de Usuario Creada",
        template: "email",
        context: {
          usuario,
          password,
        },
      });

      console.log({data: `Message sent ${info.messageId}`});
    }

    sendMail();
  };

  return Usuario;
};
