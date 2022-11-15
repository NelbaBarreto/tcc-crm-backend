/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, getTipos, update, _delete, deleteAll}
  from "../controllers/telefonos.js";

const RutasTelefonos = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/tipos", getTipos);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/telefonos", router);
};

export default RutasTelefonos; 
