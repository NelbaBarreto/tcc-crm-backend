/* eslint-disable new-cap */
import {Router} from "express";
import {findAll} from "../../controllers/encuesta/preguntas.js";

const RutasPreguntas = (app) => {
  const router = Router();

  router.get("/", findAll);

  app.use("/api/encuesta/preguntas", router);
};

export default RutasPreguntas;
