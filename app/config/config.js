import "dotenv/config.js";
const {USUARIO, HOST, PASS, DB} = process.env;
const dialect = "postgres";

const database =
{
  development: {
    username: USUARIO,
    password: PASS,
    database: DB,
    host: HOST,
    dialect: dialect,
    dialectOptions: {
      ssl: process.env.DATABASE_URL ? true : false,
      native: process.env.DATABASE_URL ? true : false,
    },
  },
  test: {
    username: "postgres",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgresql",
  },
  production: {
    username: USUARIO,
    password: PASS,
    database: DB,
    host: HOST,
    dialect: dialect,
  },
};

export default database;
