/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo caso
const create = async (req, res) => {
  const caso = {...req.body};

  // Guardar el caso
  try {
    const data = await db.caso.create(caso);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el caso.",
    });
  }
};

// Obtener todos los casos
const findAll = async (req, res) => {
  let data;
  try {
    if (req.query?.lead_id) {
      data = await db.caso.findAll({
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
      data = await db.caso.findAll({
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
        "Ocurrió un error al intentar obtener la lista de casos",
    });
  }
};

// Encontrar un caso según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.caso.findByPk(id, {
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
        message: `No se pudo encontrar el caso con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el caso con id=" + id,
    });
  }
};

const getOrigenes = async (_req, res) => {
  try {
    const data = db.caso.origenes ? db.caso.origenes : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener orígenes.",
    });
  }
};

const getPrioridades = async (_req, res) => {
  try {
    const data = db.caso.prioridades ? db.caso.prioridades : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener prioridades.",
    });
  }
};

const getEstados = async (_req, res) => {
  try {
    const data = db.caso.estados ? db.caso.estados : [];
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
    const data = db.caso.tipos ? db.caso.tipos : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener tipos.",
    });
  }
};

// Actualizar caso según su id
const update = async (req, res) => {
  try {
    const data = await db.caso.update(req.body.caso, {
      where: {caso_id: req.body.id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Caso actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el caso con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el caso con id=" + id,
    });
  };
};

// Eliminar caso según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.caso.destroy({
      where: {caso_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Caso eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el caso con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando el caso con id=" + id,
    });
  }
};

// Borrar todos los casos
const deleteAll = async (_req, res) => {
  try {
    const data = db.caso.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} casos fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los casos",
    });
  }
};

export {
  create, findAll, findOne, getPrioridades, getOrigenes, getEstados,
  getTipos, update, _delete, deleteAll,
};
