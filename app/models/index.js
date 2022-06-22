import Sequelize from "sequelize";
import Persona from "./persona.js";
import { DB, USUARIO, PASS, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";

const db = {};

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

db.persona = Persona(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;