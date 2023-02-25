import express from "express";
import "dotenv/config.js";
import cors from "cors";

import personas from "./app/routes/personas.js";
import empleados from "./app/routes/empleados.js";
import usuarios from "./app/routes/usuarios.js";
import campanas from "./app/routes/campanas.js";
import cursos from "./app/routes/cursos.js";
import direcciones from "./app/routes/direcciones.js";
import leads from "./app/routes/leads.js";
import dashboard from "./app/routes/dashboard.js";
import profesores from "./app/routes/profesores.js";
// Ventas
import organizaciones from "./app/routes/organizaciones.js";
import oportunidades from "./app/routes/oportunidades.js";
import contactos from "./app/routes/contactos.js";
// Soporte
import casos from "./app/routes/casos.js";
// Actividades
import tareas from "./app/routes/tareas.js";
// Telefonos
import telefonos from "./app/routes/telefonos.js";
// Llamadas
import llamadas from "./app/routes/llamadas.js";
// Encuesta
import preguntas from "./app/routes/encuesta/preguntas.js";
import encuesta from "./app/routes/encuesta/index.js";
import ciclos from "./app/routes/ciclos.js";

const app = express();

const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// simple route
app.get("/", (_req, res) => {
  res.json({message: "Hello world!"});
});

personas(app);
usuarios(app);
empleados(app);
dashboard(app);
campanas(app);
cursos(app);
direcciones(app);
leads(app);
profesores(app);
organizaciones(app);
oportunidades(app);
contactos(app);
casos(app);
tareas(app);
telefonos(app);
llamadas(app);
preguntas(app);
encuesta(app);
ciclos(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
