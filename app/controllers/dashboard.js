/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import {QueryTypes} from "sequelize";

// Crear y guardar un nuevo caso
const casosPorEstado = async (req, res) => {
  // Guardar el caso
  try {
    const data = await db.sequelize.query(
        "SELECT count(1) as total, estado FROM CASOS GROUP BY ESTADO",
        {
          type: QueryTypes.SELECT,
        },
    );

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
                // eslint-disable-next-line max-len
                error.message || "Ocurrió un error al intentar seleccionar el caso.",
    });
  }
};

// listar leads segun estado
const leadsPorEstado = async (req, res) => {
  try {
    const data = await db.sequelize.query(
        "SELECT count(1) as total, estado FROM leads GROUP BY ESTADO",
        {
          type: QueryTypes.SELECT,
        },
    );

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
                // eslint-disable-next-line max-len
                error.message || "Ocurrió un error al intentar seleccionar el lead.",
    });
  }
};

// listar llamadas segun estado
const llamadasPorEstado = async (req, res) => {
  try {
    const data = await db.sequelize.query(
        "SELECT count(1) as total, estado FROM llamadas GROUP BY ESTADO",
        {
          type: QueryTypes.SELECT,
        },
    );

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
                // eslint-disable-next-line max-len
                error.message || "Ocurrió un error al intentar seleccionar la llamada.",
    });
  }
};

// listar llamadas segun estado
const casosPorPrioridad = async (req, res) => {
  try {
    const data = await db.sequelize.query(
        "SELECT count(1) as total, PRIORIDAD FROM CASOS GROUP BY PRIORIDAD",
        {
          type: QueryTypes.SELECT,
        },
    );

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
                // eslint-disable-next-line max-len
                error.message || "Ocurrió un error al intentar seleccionar el caso segun prioridad.",
    });
  }
};

export {casosPorEstado, leadsPorEstado, llamadasPorEstado, casosPorPrioridad};

