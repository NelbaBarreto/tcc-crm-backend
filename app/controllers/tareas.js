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
const findAll = async (_req, res) => {
  try {
    const data = await db.tarea.findAll();

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
    const data = await db.tarea.findByPk(id);

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

// Actualizar tarea según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.tarea.update(req.body, {
      where: {tarea_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Tarea actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la tarea con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la tarea con id=" + id,
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

export {create, findAll, findOne, update, _delete, deleteAll};
