/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo Tipo campaña
const create = async (req, res) => {
  const tip_campana = {...req.body};

  // Guardar el tipo campaña
  try {
    const data = await db.tip_campana.create(tip_campana);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el tipo campaña.",
    });
  }
};

// Obtener todos los tipo campañas
const findAll = async (_req, res) => {
  try {
    const data = await db.tip_campana.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de tipo campañas",
    });
  }
};

// Encontrar un tipo campaña según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.tip_campana.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el tipo campaña con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el tipo campaña con id=" + id,
    });
  }
};

// Actualizar el tipo campaña según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.tip_campana.update(req.body, {
      where: {tipo_campana_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Tipo campaña actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el tipo campaña con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el tipo campaña con id=" + id,
    });
  };
};

// Eliminar tipo campaña según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.tip_campana.destroy({
      where: {tipo_campana_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Tipo campaña eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el tipo campaña con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando el tipo campaña con id=" + id,
    });
  }
};

// Borrar todos los tipos campañas
const deleteAll = async (_req, res) => {
  try {
    const data = db.tip_campana.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} tipos campañas fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
          "Ocurrió un error al intentar eliminar los tipo campañas",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
