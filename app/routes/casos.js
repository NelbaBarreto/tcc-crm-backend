/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, getOrigenes, getPrioridades,
  getEstados, getTipos, update, _delete, deleteAll}
  from "../controllers/casos.js";

const RutasCasos = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/origenes", getOrigenes);
  router.get("/prioridades", getPrioridades);
  router.get("/estados", getEstados);
  router.get("/tipos", getTipos);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/casos", router);
};

export default RutasCasos;
