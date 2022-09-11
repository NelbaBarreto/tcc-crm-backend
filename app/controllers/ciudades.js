/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo país
const create = async (req, res) => {
  const ciudad = {...req.body};

  // Guardar el ciudad
  try {
    const data = await db.ciudad.create(ciudad);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la ciudad.",
    });
  }
};

// Obtener todos los ciudades
const findAll = async (_req, res) => {
  try {
    const data = await db.ciudad.findAll({
      include:
        [{model: db.pais}],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de ciudades",
    });
  }
};

// Encontrar un ciudad según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.ciudad.findByPk(id, {
      include:
        [{model: db.pais}],
    });

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la ciudad con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener ciudad con id=" + id,
    });
  }
};

// Actualizar ciudad según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.ciudad.update(req.body, {
      where: {ciudad_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Ciudad actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar elal ciudad con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando ciudad con id=" + id,
    });
  };
};

// Eliminar ciudad según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.ciudad.destroy({
      where: {ciudad_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Ciudad eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la ciudad con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando ciudad con id=" + id,
    });
  }
};

// Borrar todos los ciudades
const deleteAll = async (_req, res) => {
  try {
    const data = db.ciudad.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} ciudades fueron eliminadas correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar las ciudades",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
