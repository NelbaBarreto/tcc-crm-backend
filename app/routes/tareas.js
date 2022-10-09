/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, update, _delete, deleteAll}
  from "../controllers/tareas.js";

const RutasTareas = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/tareas", router);
};

export default RutasTareas;