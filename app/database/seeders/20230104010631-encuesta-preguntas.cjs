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
          pregunta: "Según tu interacción más reciente con nuestra empresa, ¿cuál es la probabilidad de que vuelvas a comprar nuestros servicios?",
          obligatorio: true,
        },
        {
          pregunta_id: 3,
          pregunta: "Según tu interacción más reciente con nuestra empresa, ¿recomendarías nuestros servicios a un amigo o familiar?",
          obligatorio: true,
        },
        {
          pregunta_id: 4,
          pregunta: "¿Tenés algún comentario o sugerencia para nosotros?",
          obligatorio: false,
        },
      ], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("encuesta_preguntas",
      {pregunta_id: [1, 2, 3, 4]}, {});
};

export {up, down};
