/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, getEstados, getOrigenes, update,
  _delete, deleteAll}
  from "../controllers/leads.js";

const RutasLeads = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/estados", getEstados);
  router.get("/origenes", getOrigenes);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/leads", router);
};

export default RutasLeads;
