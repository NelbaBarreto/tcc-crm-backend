/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("encuesta_pregunta_opciones",
      [
        {
          pregunta_id: 1,
          etiqueta: "Muy Insatisfecho",
          valor: 1,
        },
        {
          pregunta_id: 1,
          etiqueta: "Insatisfecho",
          valor: 2,
        },
        {
          pregunta_id: 1,
          etiqueta: "Neutral",
          valor: 3,
        },
        {
          pregunta_id: 1,
          etiqueta: "Satisfecho",
          valor: 4,
        },
        {
          pregunta_id: 1,
          etiqueta: "Muy Satisfecho",
          valor: 5,
        },
      ], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("encuesta_pregunta_opciones",
      {pregunta_id: [1]}, {});
};

export {up, down};
