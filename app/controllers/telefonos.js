/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo telefono
const create = async (req, res) => {
  const telefono = {...req.body};

  // Guardar el telefono
  try {
    const data = await db.telefono.create(telefono);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el telefono.",
    });
  }
};

// Obtener todos los telefonos
const findAll = async (_req, res) => {
  try {
    const data = await db.telefono.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de telefonos",
    });
  }
};

// Encontrar un telefono según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.telefono.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el telefono con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el telefono con id=" + id,
    });
  }
};

// Actualizar telefono según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.telefono.update(req.body, {
      where: {telefono_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Telefono actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el telefono con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el telefono con id=" + id,
    });
  };
};

const getTipos = async (_req, res) => {
  try {
    const data = db.telefono.tipos ? db.telefono.tipos : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener tipos de teléfonos.",
    });
  }
};

// Eliminar telefono según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.telefono.destroy({
      where: {telefono_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Telefono eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el telefono con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando telefono con id=" + id,
    });
  }
};

// Borrar todos los telefonos
const deleteAll = async (_req, res) => {
  try {
    const data = db.telefono.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} telefonos fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los telefonos",
    });
  }
};

export {create, findAll, findOne, getTipos, update, _delete, deleteAll};