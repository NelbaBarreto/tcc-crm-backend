/* eslint-disable require-jsdoc */
import db from "../../models/index.js";
import jwt_decode from "jwt-decode";

// Validar token del enlace de encuesta de satisfacción
const validarToken = async (req, res) => {
  try {
    const data = jwt_decode(req.body.token);
    const today_timestamps = Date.parse(new Date().toString()/1000);
    let expiracion = false;
    let respondido = false;
    let message = "";

    // Verificar que el link no haya expirado aún
    if (today_timestamps > data.exp) {
      expiracion = true;
      message = "El enlace que seguiste expiró.";
    } else {
      expiracion = false;
      // Verificar que la encuesta aún no haya sido respondida
      const oportunidad =
        await db.oportunidad.findByPk(data.oportunidad_id);
      if (oportunidad.encuesta) {
        respondido = true;
        message = "Esta encuesta ya fue completada anteriormente.";
      }
    }

    res.status(200).json({
      data: {...data, valid: !expiracion && !respondido, message},
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
  try {
    const data = await db.encuesta_respuesta.create(encuesta_respuesta, {
      include:
        [{model: db.encuesta_pregunta_respuesta, as: "respuestas"}],
    });

    // Actualizar oportunidad para marcar encuesta como respondida
    const oportunidad =
     await db.oportunidad.findByPk(encuesta_respuesta.oportunidad_id);
    oportunidad.encuesta = true;
    await oportunidad.save();

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
