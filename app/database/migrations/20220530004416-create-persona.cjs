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
      type: Sequelize.STRING,
      allowNull: false,
      comment: "Nombre de la persona.",
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "Apellido de la persona.",
    },
    email: {
      type: Sequelize.STRING,
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
    telefono: {
      type: Sequelize.STRING,
      unique: true,
      comment: "Número de teléfono de la persona.",
    },
    celular: {
      type: Sequelize.STRING,
      comment: "Número de celular de la persona.",
    },
    fec_eliminacion: {
      type: Sequelize.DATE,
      comment: "Fecha en la que se eliminó el Registro",
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
  });
}

export async function down(queryInterface, _sequelize) {
  await queryInterface.dropTable("personas");
}
