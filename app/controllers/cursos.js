/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo curso
const create = async (req, res) => {
  const curso = {...req.body};

  // Guardar el curso
  try {
    const data = await db.curso.create(curso);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el curso.",
    });
  }
};

// Obtener todos los cursos
const findAll = async (_req, res) => {
  try {
    const data = await db.curso.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de cursos",
    });
  }
};

// Encontrar un curso según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.curso.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el curso con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el curso con id=" + id,
    });
  }
};

// Actualizar curso según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.curso.update(req.body.curso, {
      where: {curso_id: req.body.id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Curso actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el curso con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el curso con id=" + id,
    });
  };
};

// Eliminar curso según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.curso.destroy({
      where: {curso_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Curso eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el curso con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando el curso con id=" + id,
    });
  }
};

// Borrar todos los cursos
const deleteAll = async (_req, res) => {
  try {
    const data = db.curso.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} cursos fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los cursos",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
