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
        {
          pregunta_id: 2,
          etiqueta: "Nada Probable",
          valor: 1,
        },
        {
          pregunta_id: 2,
          etiqueta: "Poco Probable",
          valor: 2,
        },
        {
          pregunta_id: 2,
          etiqueta: "Neutral",
          valor: 3,
        },
        {
          pregunta_id: 2,
          etiqueta: "Probable",
          valor: 4,
        },
        {
          pregunta_id: 2,
          etiqueta: "Muy Probable",
          valor: 5,
        },
        {
          pregunta_id: 3,
          etiqueta: "Definitivamente No",
          valor: 1,
        },
        {
          pregunta_id: 3,
          etiqueta: "Probablemente No",
          valor: 2,
        },
        {
          pregunta_id: 3,
          etiqueta: "No Estoy Seguro",
          valor: 3,
        },
        {
          pregunta_id: 3,
          etiqueta: "Probablemente",
          valor: 4,
        },
        {
          pregunta_id: 3,
          etiqueta: "Definitivamente",
          valor: 5,
        },
      ], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("encuesta_pregunta_opciones",
      {pregunta_id: [1, 2, 3, 4]}, {});
};

export {up, down};
