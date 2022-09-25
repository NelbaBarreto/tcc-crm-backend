/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("empleados", {
    empleado_id: {
      allowNull: false,
      autoIncrement: true,
      comment: "Identificador único del empleado.",
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    persona_id: {
      type: Sequelize.INTEGER,
      comment: "Id del empleado en la tabla de personas.",
      references: {
        model: {
          tableName: "personas",
        },
        key: "persona_id",
      },
      allowNull: false,
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      comment: "Id del usuario relacionado.",
      references: {
        model: {
          tableName: "usuarios",
        },
        key: "usuario_id",
      },
      allowNull: true,
    },
    activo: {
      type: Sequelize.BOOLEAN,
      comment: "Indica si el usuario está activo o inactivo en el sistema.",
      defaultValue: false,
      allowNull: false,
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
  await queryInterface.dropTable("empleados");
};
