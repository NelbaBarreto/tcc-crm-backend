/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
"use strict";
import {createTransport} from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import "dotenv/config.js";


import {Model} from "sequelize";

export default (sequelize, DataTypes) => {
  class Oportunidad extends Model {
    static associate(models) {
      this.belongsTo(models.usuario,
          {foreignKey: "usu_asignado_id", as: "usuario"});
      this.belongsTo(models.campana, {foreignKey: "campana_id"});
      this.hasOne(models.encuesta_respuesta, {foreignKey: "oportunidad_id"});
      this.belongsTo(models.contacto, {foreignKey: "contacto_id"});
      this.belongsTo(models.curso, {foreignKey: "curso_id"});
    }
  }
  Oportunidad.init({
    oportunidad_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    etapa: {
      type: DataTypes.ENUM("Abierto", "Ganado", "Perdido"),
    },
    campana_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "campanas",
        },
        key: "campana_id",
      },
    },
    contacto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "contactos",
        },
        key: "contacto_id",
      },
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "cursos",
        },
        key: "curso_id",
      },
    },
    usu_asignado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    usu_insercion: DataTypes.STRING(20),
    usu_modificacion: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: "oportunidad",
    tableName: "oportunidades",
    createdAt: "fec_insercion",
    updatedAt: "fec_modificacion",
    hooks: {
      afterSave: (instance, _options) => {
        if (instance.etapa === "Ganado") {
          Oportunidad.sendMail(instance);
        };
      },
    },
  });

  Oportunidad.etapas = Oportunidad.getAttributes().etapa?.values;

  Oportunidad.sendMail = async (oportunidad) => {
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
        to: process.env.MAIL,
        subject: "Encuesta de Satisfacción",
        template: "encuesta",
        context: {
          oportunidad,
        },
      });

      console.log({data: `Message sent ${info.messageId}`});
    }

    sendMail();
  };

  return Oportunidad;
};
