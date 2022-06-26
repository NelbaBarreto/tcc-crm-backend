import express from "express";
import "dotenv/config.js";
import cors from "cors";
import db from "./app/models/index.js";
import personas from "./app/routes/personas.js";
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// simple route
app.get("/", (req, res) => {
  res.json({message: "Hello world!"});
});

personas(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync();
