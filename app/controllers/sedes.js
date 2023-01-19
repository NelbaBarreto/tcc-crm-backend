/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva sede
const create = async (req, res) => {
  const sede = {...req.body};

  // Guardar la sede
  try {
    const data = await db.sede.create(sede, {
      include:
        [{model: db.direccion}],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la sede.",
    });
  }
};

// Obtener todas las sedes
const findAll = async (_req, res) => {
  try {
    const data = await db.sede.findAll({
      include:
        [{model: db.direccion,
          include: [{model: db.ciudad, as: "ciudad",
            include: [{model: db.pais, as: "pais"}]}]}],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de sedes",
    });
  }
};

// Encontrar una sede según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.sede.findByPk(id, {
      include:
      [{model: db.direccion,
        include: [{model: db.ciudad, as: "ciudad",
          include: [{model: db.pais, as: "pais"}]}]}],
    });

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la sede con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la sede con id=" + id,
    });
  }
};

// Actualizar sede según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.sede.update(req.body, {
      where: {sede_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Sede actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la sede con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la sede con id=" + id,
    });
  };
};

// Eliminar sede según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.sede.destroy({
      where: {sede_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Sede eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la sede con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando la sede con id=" + id,
    });
  }
};

// Borrar todas las sedes
const deleteAll = async (_req, res) => {
  try {
    const data = db.sede.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} sedes fueron eliminadas correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar las sedes",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
