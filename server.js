import express from "express";
import "dotenv/config.js";
import jwt from "jsonwebtoken";
import cors from "cors";

const Usuario = "./app/models/Usuario.js";

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

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
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

app.post("/login", async (req, res, next) => {
  const user = await Usuario.findOne({where: {email: req.body.email}});
  if (user) {
    const password_valid =
      await Usuario.validPassword(req.body.password, user.password);

    if (password_valid) {
      token = jwt.sign({"id": user.id,
        "email": user.email,
        "nombre": user.nombre},
      process.env.SECRET);
      res.status(200).json({token: token});
    } else {
      res.status(400).json({error: "Contraseña incorrecta"});
    }
  } else {
    res.status(404).json({error: "El usuario no existe"});
  }
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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
