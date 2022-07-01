/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("empleados", {
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
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("empleados");
};
