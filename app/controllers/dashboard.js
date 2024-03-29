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
        ["prioridad", "DESC"],
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
const leadsPorEstado = async (_req, res) => {
  try {
    const data = await db.sequelize.query(
        `SELECT 
          ft.estado estado, 
          COUNT(u.estado) total 
        FROM 
          (
            SELECT 
              unnest(
                enum_range(NULL :: enum_leads_estado)
              ) AS estado
          ) ft 
          LEFT JOIN (
            select 
              u.estado 
            from 
              leads u 
          ) u ON u.estado = ft.estado 
        GROUP BY 
          ft.estado
        ORDER BY ft.estado`,
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
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
        ["prioridad", "DESC"],
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

    const dataset_1 = await db.sequelize.query(
        `SELECT 
          ft.origen origen, 
          COUNT(u.origen) total 
        FROM 
          (
            SELECT 
              unnest(
                enum_range(NULL :: enum_leads_origen)
              ) AS origen
          ) ft 
          LEFT JOIN (
            select 
              u.origen 
            from 
              leads u 
            where 
              estado <> 'Convertido'
          ) u ON u.origen = ft.origen 
        GROUP BY 
          ft.origen
        ORDER BY ft.origen`,
        {
          type: QueryTypes.SELECT,
        },
    );
    data.push(dataset_1);

    const dataset_2 = await db.sequelize.query(
        `SELECT 
          ft.origen origen, 
          COUNT(u.origen) total 
        FROM 
          (
            SELECT 
              unnest(
                enum_range(NULL :: enum_leads_origen)
              ) AS origen
          ) ft 
          LEFT JOIN (
            select 
              u.origen 
            from 
              leads u 
            where 
              estado = 'Convertido'
          ) u ON u.origen = ft.origen 
        GROUP BY 
          ft.origen
        ORDER BY ft.origen`,
        {
          type: QueryTypes.SELECT,
        },
    );
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

const respuestasPorValor = async (_req, res) => {
  try {
    const data = await db.sequelize.query(
        `SELECT 
          COUNT(r.valor) total, 
          o.etiqueta 
        FROM 
          encuesta_pregunta_opciones o 
          LEFT JOIN 
          encuesta_pregunta_respuestas r ON o.pregunta_id = r.pregunta_id 
          AND o.valor = r.valor 
        GROUP BY 
          o.etiqueta,
          o.opcion_id
        ORDER BY o.opcion_id ASC`,
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

const csat = async (_req, res) => {
  try {
    const data = await db.sequelize.query(
        `WITH r AS (
          SELECT
            SUM(
              CASE WHEN valor IN (4, 5) THEN 1 ELSE 0 END
            ) total_satisfechos,
            COUNT(1) total_respuestas
          FROM
            encuesta_pregunta_respuestas
          WHERE
            pregunta_id = 1
        )
        SELECT
          CASE WHEN r.total_respuestas > 0 THEN (
            r.total_satisfechos :: FLOAT / r.total_respuestas
          ) * 100 ELSE 0 END csat
        FROM
          r`,
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

const oportunidadesGanadasPorCurso = async (_req, res) => {
  try {
    const data = await db.sequelize.query(
        `SELECT
          COUNT(1) total,
          c.nombre curso
        FROM
              oportunidades o
          INNER JOIN cursos c ON c.curso_id = o.curso_id
        WHERE
          o.estado = 'Ganado'
        GROUP BY
          c.nombre`,
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
        error.message || "Ocurrió un error al intentar obtener los datos.",
    });
  }
};

const leadsPorCampana = async (_req, res) => {
  try {
    const data = await db.lead.findAll({
      attributes: [
        "campana.campana_id",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("campana.campana_id")), "total"],
      ],
      include:
        [{model: db.campana}],
      where: {
        campana_id: {
          [Op.not]: null,
        },
      },
      group: ["campana.campana_id", "campana.nombre"],
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

const oportunidadesPorCampana = async (_req, res) => {
  try {
    const data = await db.oportunidad.findAll({
      attributes: [
        "campana.campana_id",
        [db.sequelize.fn("COUNT",
            db.sequelize.col("campana.campana_id")), "total"],
      ],
      include:
        [{model: db.campana}],
      where: {
        campana_id: {
          [Op.not]: null,
        },
      },
      group: ["campana.campana_id", "campana.nombre"],
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

export {
  casosPorEstado, leadsPorEstado, llamadasPorEstado,
  casosActivosPorPrioridad, casosPorTipo, casosPorOrigen, tareasPorEstado,
  tareasActivasPorPrioridad, leadsPorOrigen, respuestasPorValor, csat,
  oportunidadesGanadasPorCurso, leadsPorCampana, oportunidadesPorCampana,
};

