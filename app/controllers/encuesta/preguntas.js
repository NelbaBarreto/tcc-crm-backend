/* eslint-disable require-jsdoc */
import db from "../../models/index.js";

// Obtener todas las campañas
const findAll = async (_req, res) => {
  try {
    const data = await db.encuesta_pregunta.findAll({include:
      [{model: db.encuesta_pregunta_opcion, as: "opciones",
        attributes: ["opcion_id", "etiqueta", "valor"]}],
    attributes: ["pregunta", "obligatorio", "pregunta_id"]});

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de preguntas",
    });
  }
};

export {findAll};
