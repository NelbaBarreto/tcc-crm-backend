/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("personas", [{
    nombre: "David",
    apellido: "Taboada",
    email: "rkto737@gmail.com",
    celular: "0972182811",
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
  }], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("personas", {email: "rkto737@gmail.com"}, {});
};

export {up, down};
