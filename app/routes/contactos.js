/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, update,
  generarTokenEncuesta, getOrigenes, _delete, deleteAll}
  from "../controllers/contactos.js";

const RutasContactos = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/generarTokenEncuesta/:contacto/:oportunidad",
      generarTokenEncuesta);
  router.get("/origenes", getOrigenes);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/contactos", router);
};

export default RutasContactos;
