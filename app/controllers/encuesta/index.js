/* eslint-disable require-jsdoc */
import db from "../../models/index.js";
import jwt_decode from "jwt-decode";

// Obtener todas las campañas
const validarToken = async (req, res) => {
  try {
    const data = jwt_decode(req.body.token);
    const today_timestamps = Date.parse(new Date().toString()/1000);
    let expiracion = true;
    let message = "";

    if (today_timestamps > data.exp) {
      expiracion = true;
      message = "El enlace que seguiste expiró.";
    } else {
      expiracion = false;
    }

    res.status(200).json({
      data: {...data, valid: !expiracion, message},
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      data: {valid: false, message: "El enlace no está disponible."},
    });
  }
};

// Gguardar las respuestas de la encuesta
const create = async (req, res) => {
  const encuesta_respuesta = {...req.body};
  // Guardar las respuestas
  console.log("----------------------------------");
  console.log(encuesta_respuesta);
  try {
    const data = await db.encuesta_respuesta.create(encuesta_respuesta, {
      include:
        [{model: db.encuesta_pregunta_respuesta, as: "respuestas"}],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar guardar las respuestas.",
    });
  }
};

export {validarToken, create};
