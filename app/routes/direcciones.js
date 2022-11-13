/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, update, _delete, deleteAll, getTipos}
  from "../controllers/direcciones.js";

const RutasDirecciones = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/tipos", getTipos);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/direcciones", router);
};

export default RutasDirecciones;
