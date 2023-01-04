import express from "express";
import "dotenv/config.js";
import cors from "cors";

import personas from "./app/routes/personas.js";
import empleados from "./app/routes/empleados.js";
import usuarios from "./app/routes/usuarios.js";
import paises from "./app/routes/paises.js";
import ciudades from "./app/routes/ciudades.js";
import campanas from "./app/routes/campanas.js";
import cursos from "./app/routes/cursos.js";
import direcciones from "./app/routes/direcciones.js";
import leads from "./app/routes/leads.js";
import profesores from "./app/routes/profesores.js";
import sucursales from "./app/routes/sucursales.js";
import tip_campanas from "./app/routes/tip_campanas.js";
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
// Roles
import roles from "./app/routes/roles.js";
// Llamadas
import llamadas from "./app/routes/llamadas.js";
// Encuesta
import preguntas from "./app/routes/encuesta/preguntas.js";

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
paises(app);
ciudades(app);
campanas(app);
cursos(app);
direcciones(app);
leads(app);
profesores(app);
sucursales(app);
tip_campanas(app);
organizaciones(app);
oportunidades(app);
contactos(app);
casos(app);
tareas(app);
telefonos(app);
roles(app);
llamadas(app);
preguntas(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
