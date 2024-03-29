/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, update, getEstados, _delete, deleteAll}
  from "../controllers/oportunidades.js";

const RutasOportunidades = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/estados", getEstados);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/oportunidades", router);
};

export default RutasOportunidades;
