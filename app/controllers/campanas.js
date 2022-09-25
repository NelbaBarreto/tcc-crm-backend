/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva campaña
const create = async (req, res) => {
  const campana = {...req.body};

  // Guardar la campaña
  try {
    const data = await db.campana.create(campana);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la campaña.",
    });
  }
};

// Obtener todas las campañas
const findAll = async (_req, res) => {
  try {
    const data = await db.campana.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de campañas",
    });
  }
};

// Encontrar una campaña según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.campana.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la campaña con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la campaña con id=" + id,
    });
  }
};

// Actualizar campaña según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.campana.update(req.body, {
      where: {campana_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Campaña actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la campaña con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la campaña con id=" + id,
    });
  };
};

// Eliminar campaña según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.campana.destroy({
      where: {campana_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Campaña eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la campaña con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando campaña con id=" + id,
    });
  }
};

// Borrar todas las campañas
const deleteAll = async (_req, res) => {
  try {
    const data = db.campana.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} campañas fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar las campañas",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
