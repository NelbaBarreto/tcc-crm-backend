/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva tarea
const create = async (req, res) => {
  const tarea = {...req.body};

  // Guardar la tarea
  try {
    const data = await db.tarea.create(tarea);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la tarea.",
    });
  }
};

// Obtener todas las tareas
const findAll = async (req, res) => {
  let data;
  try {
    if (req.query?.lead_id) {
      data = await db.tarea.findAll({
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
    } else if (req.query?.contacto_id) {
      data = await db.tarea.findAll({
        include:
          [{model: db.usuario, as: "usuario"},
            {model: db.lead, include: [{model: db.persona, as: "persona"}]},
            {
              model: db.contacto, include:
              [{model: db.persona, as: "persona"}],
            }],
        where: {
          contacto_id: req.query.contacto_id,
        },
        order: [
          ["fec_insercion", "DESC"],
        ],
      });
    } else {
      data = await db.tarea.findAll({
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
        "Ocurrió un error al intentar obtener la lista de tareas",
    });
  }
};

// Encontrar una tarea según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.tarea.findByPk(id, {
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
        message: `No se pudo encontrar la tarea con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la tarea con id=" + id,
    });
  }
};

const getPrioridades = async (_req, res) => {
  try {
    const data = db.tarea.prioridades ? db.tarea.prioridades : [];
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
    const data = db.tarea.estados ? db.tarea.estados : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener estados.",
    });
  }
};

// Actualizar tarea según su id
const update = async (req, res) => {
  try {
    const data = await db.tarea.update(req.body.tarea, {
      where: {tarea_id: req.body.id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Tarea actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la tarea con id=" + req.body.id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la tarea con id=" + req.body.id,
    });
  };
};

// Eliminar tarea según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.tarea.destroy({
      where: {tarea_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Tarea eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la tarea con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando la tarea con id=" + id,
    });
  }
};

// Borrar todos las tareas
const deleteAll = async (_req, res) => {
  try {
    const data = db.tarea.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} tareas fueron eliminadas correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar las tareas",
    });
  }
};

export {create, findAll, findOne, update,
  _delete, deleteAll, getPrioridades, getEstados};

