/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("usuarios", {
    usuario_id: {
      allowNull: false,
      autoIncrement: true,
      comment: "Id del usuario.",
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nom_usuario: {
      type: Sequelize.STRING,
      comment: "Nombre de usuario en el sistema.",
      allowNull: false,
      unique: true,
    },
    activo: {
      type: Sequelize.BOOLEAN,
      comment: "Indica si el usuario está activo o inactivo en el sistema.",
      defaultValue: false,
      allowNull: false,
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
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("usuarios");
}
