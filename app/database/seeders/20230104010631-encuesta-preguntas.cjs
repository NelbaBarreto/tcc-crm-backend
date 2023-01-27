/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("encuesta_preguntas",
      [
        {
          pregunta_id: 1,
          pregunta: "En general, ¿cuál es tu grado de satisfacción con tu interacción más reciente con nuestra empresa?",
          obligatorio: true,
        },
        {
          pregunta_id: 2,
          pregunta: "¿Tenés algún comentario o sugerencia para nosotros?",
          obligatorio: false,
        },
      ], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("encuesta_preguntas",
      {pregunta_id: [1, 2]}, {});
};

export {up, down};
