/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("personas", [{
    nombre: "David Taboada",
    email: "rkto737@gmail.com",
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
  }], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("personas", {email: "rkto737@gmail.com"}, {});
};

export {up, down};
