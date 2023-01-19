/* eslint-disable new-cap */
import {Router} from "express";
import {casosPorEstado, leadsPorEstado, llamadasPorEstado, casosPorPrioridad}
  from "../controllers/dashboard.js";

const RutasDashboard = (app) => {
  const router = Router();

  router.get("/casosPorEstado", casosPorEstado);
  router.get("/leadsPorEstado", leadsPorEstado);
  router.get("/llamadasPorEstado", llamadasPorEstado);
  router.get("/casosPorPrioridad", casosPorPrioridad);

  app.use("/api/dashboard", router);
};

export default RutasDashboard;
