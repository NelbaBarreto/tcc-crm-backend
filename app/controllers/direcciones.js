/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva direccion
const create = async (req, res) => {
  const direccion = {...req.body};

  // Guardar la direccion
  try {
    const data = await db.direccion.create(direccion);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la dirección.",
    });
  }
};

// Obtener todas las direcciones
const findAll = async (_req, res) => {
  try {
    const data = await db.direccion.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de direcciones",
    });
  }
};

// Encontrar una dirección según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.direccion.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la dirección con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la dirección con id=" + id,
    });
  }
};

// Actualizar dirección según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.direccion.update(req.body, {
      where: {direccion_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Dirección actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la dirección con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la dirección con id=" + id,
    });
  };
};

// Eliminar dirección según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.direccion.destroy({
      where: {direccion_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Dirección eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la dirección con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando dirección con id=" + id,
    });
  }
};

// Borrar todas las direcciones
const deleteAll = async (_req, res) => {
  try {
    const data = db.direccion.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} direcciones fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
          "Ocurrió un error al intentar eliminar las direcciones",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
