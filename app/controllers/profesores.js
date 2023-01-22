/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo profesor
const create = async (req, res) => {
  const profesor = {...req.body};

  // Guardar el profesor
  try {
    const data = await db.profesor.create(profesor, {
      include:
        [{
          model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"},
            {model: db.telefono, as: "telefonos"}],
        }],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el profesor.",
    });
  }
};

// Obtener todos los profesores
const findAll = async (_req, res) => {
  try {
    const data = await db.profesor.findAll({
      include:
        [{
          model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"}],
        },
        ],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de profesores",
    });
  }
};

// Encontrar un profesor según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.profesor.findByPk(id, {
      include:
        [{
          model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"}],
        },
        ],
    });

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar al profesor con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener al profesor con id=" + id,
    });
  }
};

// Actualizar profesor según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.profesor.update(req.body, {
      where: {profesor_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Profesor actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar al profesor con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando al profesor con id=" + id,
    });
  };
};

// Eliminar profesor según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const profesor = await db.profesor.findByPk(id);
    const persona_id = profesor.persona_id;
    await db.direccion.destroy({
      where: {persona_id: persona_id},
    });
    await db.telefono.destroy({
      where: {persona_id: persona_id},
    });
    const data = await db.profesor.destroy({
      where: {profesor_id: id},
    });
    await db.persona.destroy({
      where: {persona_id: persona_id},
    });
    if (data == 1) {
      res.status(200).json({
        message: "Profesor eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar al profesor con id=" + id,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error eliminando al profesor con id=" + id,
    });
  }
};

// Borrar todos los profesores
const deleteAll = async (_req, res) => {
  try {
    const data = db.profesor.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} profesores fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        "Ocurrió un error al intentar eliminar a los profesores",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
