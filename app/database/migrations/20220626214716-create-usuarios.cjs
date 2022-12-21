/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("usuarios", {
    usuario_id: {
      allowNull: false,
      autoIncrement: true,
      comment: "Identificador único del usuario.",
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nom_usuario: {
      type: Sequelize.STRING(20),
      comment: "Nombre de usuario en el sistema.",
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
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
      comment: "Dirección de correo del usuario.",
      validate: {
        isEmail: {
          args: true,
          msg: "Ingrese una dirección de correo válida.",
        },
      },
    },
    usu_insercion: {
      allowNull: false,
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
      allowNull: false,
      type: Sequelize.STRING(20),
      comment: "Nombre del usuario que modificó el registro por última vez.",
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("usuarios");
}
