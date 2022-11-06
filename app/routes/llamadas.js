/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne,
  getEstados, getTipos, update, _delete, deleteAll}
  from "../controllers/llamadas.js";

const RutasLlamadas = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/estados", getEstados);
  router.get("/tipos", getTipos);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/llamadas", router);
};

export default RutasLlamadas;
