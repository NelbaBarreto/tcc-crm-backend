/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva llamada
const create = async (req, res) => {
  const llamada = {...req.body};

  // Guardar la llamada
  try {
    const data = await db.llamada.create(llamada);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la llamada.",
    });
  }
};

// Obtener todas las llamadas
const findAll = async (req, res) => {
  let data;
  try {
    if (req.query?.lead_id) {
      data = await db.llamada.findAll({
        include:
          [{model: db.usuario, as: "usuario"},
            {model: db.lead, include: [{model: db.persona, as: "persona"}]},
            {
              model: db.contacto, include:
              [{model: db.persona, as: "persona"}],
            }],
        where: {
          lead_id: req.query.lead_id,
        },
        order: [
          ["fec_insercion", "DESC"],
        ],
      });
    } else {
      data = await db.llamada.findAll({
        include:
          [{model: db.usuario, as: "usuario"},
            {model: db.lead, include: [{model: db.persona, as: "persona"}]},
            {
              model: db.contacto, include:
              [{model: db.persona, as: "persona"}],
            }],
        order: [
          ["fec_insercion", "DESC"],
        ],
      });
    }

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de llamadas",
    });
  }
};

// Encontrar una llamada según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.llamada.findByPk(id, {
      include:
        [
          {model: db.usuario, as: "usuario"},
          {model: db.lead, include: [{model: db.persona, as: "persona"}]},
          {model: db.contacto, include: [{model: db.persona, as: "persona"}]},
        ],
    });

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la llamada con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la llamada con id=" + id,
    });
  }
};

const getEstados = async (_req, res) => {
  try {
    const data = db.llamada.estados ? db.llamada.estados : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener estados.",
    });
  }
};

const getTipos = async (_req, res) => {
  try {
    const data = db.llamada.tipos ? db.llamada.tipos : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener tipos.",
    });
  }
};

// Actualizar llamada según su id
const update = async (req, res) => {
  try {
    const data = await db.llamada.update(req.body.llamada, {
      where: {llamada_id: req.body.id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Llamada actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la llamada con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la llamada con id=" + id,
    });
  };
};

// Eliminar llamada según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.llamada.destroy({
      where: {llamada_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Llamada eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la llamada con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando la llamada con id=" + id,
    });
  }
};

// Borrar todos las llamadas
const deleteAll = async (_req, res) => {
  try {
    const data = db.llamada.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} llamadas fueron eliminadas correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar las llamadas",
    });
  }
};

export {create, findAll, findOne, getEstados,
  getTipos, update, _delete, deleteAll};
