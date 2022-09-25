/* eslint-disable new-cap */
import {Router} from "express";
import {create, findAll, findOne, update, _delete, deleteAll, autenticarUsuario}
  from "../controllers/usuarios.js";

const RutasUsuarios = (app) => {
  const router = Router();

  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", _delete);
  router.delete("/", deleteAll);
  router.post("/login", autenticarUsuario);

  app.use("/api/usuarios", router);
};

export default RutasUsuarios;
