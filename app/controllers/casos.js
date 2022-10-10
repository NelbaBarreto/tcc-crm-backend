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
const findAll = async (_req, res) => {
  try {
    const data = await db.caso.findAll();

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
    const data = await db.caso.findByPk(id);

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

// Actualizar caso según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.caso.update(req.body, {
      where: {caso_id: id},
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

export {create, findAll, findOne, update, _delete, deleteAll};
