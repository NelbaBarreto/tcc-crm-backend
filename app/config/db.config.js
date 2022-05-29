export const { HOST, USUARIO, PASS, DB } = process.env;
export const dialect = "postgres";

export const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};
