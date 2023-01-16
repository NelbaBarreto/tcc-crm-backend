/* eslint-disable new-cap */
import {Router} from "express";
import {validarToken, create} from "../../controllers/encuesta/index.js";

const RutasPreguntas = (app) => {
  const router = Router();

  router.post("/validarToken", validarToken);
  router.post("/enviar", create);

  app.use("/api/encuesta", router);
};

export default RutasPreguntas;
