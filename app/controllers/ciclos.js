/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo ciclo
const create = async (req, res) => {
  const curso_ciclo = {...req.body};

  // Guardar el ciclo
  try {
    const data = await db.curso_ciclo.create(curso_ciclo);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el ciclo.",
    });
  }
};

// Obtener todos los ciclos
const findAll = async (_req, res) => {
  try {
    const data = await db.curso_ciclo.findAll({include:
      [{model: db.curso}]});

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de ciclos",
    });
  }
};

// Encontrar un ciclo según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.curso_ciclo.findByPk(id, {include:
      [{model: db.curso}]});

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el ciclo con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el ciclo con id=" + id,
    });
  }
};

// Actualizar ciclo según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.curso_ciclo.update(req.body.curso_ciclo, {
      where: {ciclo_id: req.body.id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Ciclo actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el ciclo con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el ciclo con id=" + id,
    });
  };
};

// Eliminar ciclo según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.curso_ciclo.destroy({
      where: {ciclo_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Ciclo eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el ciclo con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando el ciclo con id=" + id,
    });
  }
};

// Borrar todos los ciclos
const deleteAll = async (_req, res) => {
  try {
    const data = db.curso_ciclo.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} ciclos fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los ciclos",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
