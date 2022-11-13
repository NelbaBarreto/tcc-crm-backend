/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva sucursal
const create = async (req, res) => {
  const sucursal = {...req.body};

  // Guardar la sucursal
  try {
    const data = await db.sucursal.create(sucursal, {
      include:
        [{model: db.direccion}],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la sucursal.",
    });
  }
};

// Obtener todas las sucursales
const findAll = async (_req, res) => {
  try {
    const data = await db.sucursal.findAll({
      include:
        [{model: db.direccion}],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de sucursales",
    });
  }
};

// Encontrar una sucursal según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.sucursal.findByPk(id, {
      include:
        [{model: db.direccion}],
    });

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la sucursal con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la sucursal con id=" + id,
    });
  }
};

// Actualizar sucursal según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.sucursal.update(req.body, {
      where: {sucursal_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Sucursal actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la sucursal con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la sucursal con id=" + id,
    });
  };
};

// Eliminar sucursal según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.sucursal.destroy({
      where: {sucursal_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Sucursal eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la sucursal con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando la sucursal con id=" + id,
    });
  }
};

// Borrar todas las sucursales
const deleteAll = async (_req, res) => {
  try {
    const data = db.sucursal.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} sucursales fueron eliminadas correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar las sucursales",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
