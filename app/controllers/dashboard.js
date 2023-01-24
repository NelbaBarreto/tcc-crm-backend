/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import {QueryTypes, Op} from "sequelize";

// Casos
const casosActivosPorPrioridad = async (_req, res) => {
  try {
    const data = await db.caso.findAll({
      attributes: [
        "prioridad",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("prioridad")), "total"],
      ],
      group: "prioridad",
      where: {
        estado: {[Op.in]: ["Pendiente", "En Proceso"]},
      },
      order: [
        ["prioridad", "ASC"],
      ],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar seleccionar el caso.",
    });
  }
};

// Crear y guardar un nuevo caso
const casosPorEstado = async (_req, res) => {
  // Guardar el caso
  try {
    const data = await db.caso.findAll({
      attributes: [
        "estado",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("estado")), "total"],
      ],
      group: "estado",
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar seleccionar el caso.",
    });
  }
};

const casosPorTipo = async (_req, res) => {
  try {
    const data = await db.caso.findAll({
      attributes: [
        "tipo",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("tipo")), "total"],
      ],
      group: "tipo",
      order: [
        ["tipo", "ASC"],
      ],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar seleccionar el caso.",
    });
  }
};

const casosPorOrigen = async (_req, res) => {
  try {
    const data = await db.caso.findAll({
      attributes: [
        "origen",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("origen")), "total"],
      ],
      group: "origen",
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
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
        error.message || "Ocurrió un error al intentar seleccionar la llamada.",
    });
  }
};

export {casosPorEstado, leadsPorEstado, llamadasPorEstado,
  casosActivosPorPrioridad, casosPorTipo, casosPorOrigen};

