/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("empleados", [{
    persona_id: 1,
    activo: true,
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
  }], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("empleados", {persona_id: 1}, {});
};

export {up, down};
