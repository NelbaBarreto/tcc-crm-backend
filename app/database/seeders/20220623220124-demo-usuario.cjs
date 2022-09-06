/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("usuarios", [{
    nom_usuario: "nbarreto",
    email: "barretonelba@gmail.com",
    password: "123456",
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
  }], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("usuarios",
      {email: "barretonelba@gmail.com"}, {});
};

export {up, down};
