/* eslint-disable new-cap */
import {Router} from "express";
import {
  casosPorEstado, leadsPorEstado, llamadasPorEstado,
  casosActivosPorPrioridad, casosPorTipo, casosPorOrigen, tareasPorEstado,
  tareasActivasPorPrioridad, leadsPorOrigen, respuestasPorValor, csat,
  oportunidadesGanadasPorCurso, leadsPorCampana, oportunidadesPorCampana,
}
  from "../controllers/dashboard.js";

const RutasDashboard = (app) => {
  const router = Router();

  router.get("/casosPorEstado", casosPorEstado);
  router.get("/leadsPorEstado", leadsPorEstado);
  router.get("/llamadasPorEstado", llamadasPorEstado);
  router.get("/tareasPorEstado", tareasPorEstado);
  router.get("/casosPorTipo", casosPorTipo);
  router.get("/casosPorOrigen", casosPorOrigen);
  router.get("/casosActivosPorPrioridad", casosActivosPorPrioridad);
  router.get("/tareasActivasPorPrioridad", tareasActivasPorPrioridad);
  router.get("/leadsPorOrigen", leadsPorOrigen);
  router.get("/respuestasPorValor", respuestasPorValor);
  router.get("/csat", csat);
  router.get("/oportunidadesGanadasPorCurso", oportunidadesGanadasPorCurso);
  router.get("/leadsPorCampana", leadsPorCampana);
  router.get("/oportunidadesPorCampana", oportunidadesPorCampana);

  app.use("/api/dashboard", router);
};

export default RutasDashboard;
