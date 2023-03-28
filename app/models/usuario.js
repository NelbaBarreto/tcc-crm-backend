/* eslint-disable require-jsdoc */
import Sequelize, {Model} from "sequelize";
import bcrypt from "bcrypt";
import {createTransport} from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import "dotenv/config.js";

export default (sequelize) => {
  let auxPassword;
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
      validate: {
        notNull: {
          msg: "Ingrese un nombre de usuario.",
        },
        notEmpty: {
          msg: "El nombre de usuario no puede estar vacío.",
        },
        len: {
          args: [3, 255],
          msg: "El nombre de usuario debe tener entre 3 y 20 caracteres.",
        },
      },
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
        auxPassword = "";
        for (let i = 0; i <= passwordLength; i++) {
          const randomNumber = Math.floor(Math.random() * chars.length);
          auxPassword += chars.substring(randomNumber, randomNumber +1);
        }
        if (auxPassword) {
          const salt = bcrypt.genSaltSync(10);
          usuario.password = bcrypt.hashSync(auxPassword, salt);
        }
      },
      afterCreate: async (usuario) => {
        Usuario.sendMail(usuario?.toJSON(), auxPassword);
        auxPassword = "";
      },
      beforeUpdate: async (usuario) => {
        if (usuario.password) {
          const salt = bcrypt.genSaltSync(10);
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
    return bcrypt.compareSync(password, hash);
  };

  Usuario.sendMail = async (usuario, password) => {
    async function sendMail() {
      console.log("Enviando correo...");
      const transporter = createTransport({
        service: process.env.MAIL_SERVICE,
        secure: true,
        auth: {
          user: process.env.MAIL_SENDER,
          pass: process.env.MAIL_PASS,
        },
      });
      transporter.verify((err, _success) => {
        if (err) console.error(err);
        console.log("Your config is correct");
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
        from: process.env.MAIL_SENDER,
        // to: usuario.email,
        to: process.env.MAIL,
        subject: "Nueva Cuenta de Usuario Creada",
        template: "email",
        context: {
          usuario,
          password,
        },
      });

      console.log({data: `Mensaje enviado ${info.messageId}`});
    }

    sendMail();
  };

  return Usuario;
};
