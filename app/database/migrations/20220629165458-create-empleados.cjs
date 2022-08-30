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
      comment: "Dirección de correo del usuario.",
      validate: {
        isEmail: {
          args: true,
          msg: "Ingrese una dirección de correo válida.",
        },
      },
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
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("empleados");
};
