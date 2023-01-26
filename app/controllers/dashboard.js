/* eslint-disable prefer-const */
/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import {QueryTypes, Op} from "sequelize";

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
        estado: {[Op.in]: ["Pendiente", "En Curso"]},
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

const casosPorEstado = async (_req, res) => {
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
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
const llamadasPorEstado = async (_req, res) => {
  try {
    const data = await db.llamada.findAll({
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

const tareasPorEstado = async (_req, res) => {
  try {
    const data = await db.tarea.findAll({
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

const tareasActivasPorPrioridad = async (_req, res) => {
  try {
    const data = await db.tarea.findAll({
      attributes: [
        "prioridad",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("prioridad")), "total"],
      ],
      group: "prioridad",
      where: {
        estado: {[Op.in]: ["Pendiente", "En Curso"]},
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

const leadsPorOrigen = async (_req, res) => {
  try {
    let data = [];

    const dataset_1 = await db.lead.findAll({
      attributes: [
        "origen",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("origen")), "total"],
      ],
      group: "origen",
    });
    data.push(dataset_1);

    const dataset_2 = await db.lead.findAll({
      attributes: [
        "origen",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("origen")), "total"],
      ],
      group: "origen",
      where: {
        estado: "Convertido",
      },
    });
    data.push(dataset_2);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

export {
  casosPorEstado, leadsPorEstado, llamadasPorEstado,
  casosActivosPorPrioridad, casosPorTipo, casosPorOrigen, tareasPorEstado,
  tareasActivasPorPrioridad, leadsPorOrigen,
};

