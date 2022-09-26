/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo país
const create = async (req, res) => {
  const lead = {...req.body};

  // Guardar el lead
  try {
    const data = await db.lead.create(lead);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el país.",
    });
  }
};

// Obtener todos los leads
const findAll = async (_req, res) => {
  try {
    const data = await db.lead.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de leads",
    });
  }
};

// Encontrar un lead según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.lead.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el lead con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener lead con id=" + id,
    });
  }
};

// Actualizar lead según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.lead.update(req.body, {
      where: {lead_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "País actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el lead con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando lead con id=" + id,
    });
  };
};

// Eliminar lead según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.lead.destroy({
      where: {lead_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "País eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el lead con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando lead con id=" + id,
    });
  }
};

// Borrar todos los leads
const deleteAll = async (_req, res) => {
  try {
    const data = db.lead.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} leads fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los leads",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
