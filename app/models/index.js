import { DB, USUARIO, PASS, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import Sequelize from "sequelize";
import Usuario from "./usuarios.js";

const sequelize = new Sequelize(DB, USUARIO, PASS, {
  host: HOST,
  dialect: _dialect,
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established succesfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database: ", err);
  });

export {
  Sequelize,
  sequelize,
  Usuario
};
