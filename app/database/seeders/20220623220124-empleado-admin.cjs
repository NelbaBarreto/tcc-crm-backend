/* eslint-disable require-jsdoc */
import bcrypt from "bcrypt";
import "dotenv/config.js";

const encryptPassword = () => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(process.env.ADMIN_PASS, salt);
};

const up = async (queryInterface, _Sequelize) => {
  const persona = await queryInterface.bulkInsert("personas", [{
    nombre: "Administrador",
    email: "info@kuaasys.com",
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
    usu_insercion: "admin",
    usu_modificacion: "admin",
  }], {returning: true});

  const usuario = await queryInterface.bulkInsert("usuarios", [{
    nom_usuario: "admin",
    email: "info@kuaasys.com",
    password: encryptPassword(),
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
    usu_insercion: "admin",
    usu_modificacion: "admin",
  }], {returning: true});

  await queryInterface.bulkInsert("empleados", [{
    activo: true,
    cargo: "Administrador",
    persona_id: persona[0].persona_id,
    usuario_id: usuario[0].usuario_id,
    fec_insercion: new Date(),
    fec_modificacion: new Date(),
    usu_insercion: "admin",
    usu_modificacion: "admin",
  }], {returning: true});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("personas", null, {});
  await queryInterface.bulkDelete("usuarios", null, {});
  await queryInterface.bulkDelete("empleados", null, {});
};

export {up, down};
