/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, update, _delete, deleteAll}
  from "../controllers/ciudades.js";

const RutasCiudades = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/ciudades", router);
};

export default RutasCiudades;
