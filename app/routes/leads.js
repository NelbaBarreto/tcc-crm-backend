/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, update, _delete, deleteAll}
  from "../controllers/leads.js";

<<<<<<< HEAD
const RutasLeads = (app) => {
=======
const RutasPaises = (app) => {
>>>>>>> main
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);

  app.use("/api/leads", router);
};

<<<<<<< HEAD
export default RutasLeads;
=======
export default RutasPaises;
>>>>>>> main
