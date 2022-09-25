/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("personas", {
    persona_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      field: "persona_id",
      comment: "Identificador único de la persona.",
    },
    nombre: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "Nombre y apellido de la persona o " +
        "nombre comercial de la organización.",
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: {
        args: false,
        msg: "Ingrese la dirección de correo electrónico",
      },
      unique: {
        args: true,
        msg: "La dirección de correo ya existe.",
      },
      comment: "Dirección de correo de la persona.",
      validate: {
        isEmail: {
          args: true,
          msg: "Ingrese una dirección de correo válida.",
        },
      },
    },
    nro_documento: {
      type: Sequelize.STRING(20),
      comment: "Número de documento de la persona.",
      unique: {
        args: true,
        msg: "Ya existe una persona con este número de documento.",
      },
    },
    tip_documento: {
      type: Sequelize.ENUM("CI", "RUC", "Cédula Extranjera", "Pasaporte"),
      comment: "Tipo de documento de la persona (CI, RUC, etc.).",
    },
    usu_insercion: {
      // allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que insertó el registro.",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "fec_insercion",
      comment: "Fecha en la que se creó el registro.",
      defaultValue: Date.now(),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "fec_modificacion",
      comment: "Fecha en la que se modificó el registro por última vez.",
      defaultValue: Date.now(),
    },
    usu_modificacion: {
      // allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que modificó el registro por última vez.",
    },
  });
}

export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("personas");
}
