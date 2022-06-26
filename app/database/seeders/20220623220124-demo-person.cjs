/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("personas", [{
    nombre: "David",
    apellido: "Taboada",
    email: "rkto737@gmail.com",
    celular: "0972182811",
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
  }], {});
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
