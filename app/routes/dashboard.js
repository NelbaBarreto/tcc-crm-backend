/* eslint-disable new-cap */
import {Router} from "express";
import {casosPorEstado}
  from "../controllers/dashboard.js";

const RutasDashboard = (app) => {
  const router = Router();

  router.get("/casosPorEstado", casosPorEstado);

  app.use("/api/dashboard", router);
};

export default RutasDashboard;
