/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, getTipDocumentos, update, _delete, deleteAll}
  from "../controllers/personas.js";

const RutasPersonas = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/tip_documentos", getTipDocumentos);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/personas", router);
};

export default RutasPersonas;
