/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import persona from "../models/persona.js";
const Persona = persona(db.sequelize, db.DataTypes);

// Crear y guardar una nueva persona
const create = async (req, res) => {
  // Validar la petición
  if (!req.body.title) {
    res.status(400).send({
      message: "No puede estar vacío.",
    });
    return;
  }

  const persona = {...req.body};

  // Guardar la persona
  try {
    const data = await Persona.create(persona);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Ocurrió un error al intentar crear la persona.",
    });
  }
};

// Obtener todas las personas
const findAll = async (_req, res) => {
  try {
    const data = await Persona.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de personas",
    });
  }
};

// Encontrar una persona según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Persona.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la persona con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener persona con id=" + id,
    });
  }
};

// Actualizar persona según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Persona.update(req.body, {
      where: {persona_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Persona actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar a la persona con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando persona con id=" + id,
    });
  };
};

// Eliminar persona según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Persona.destroy({
      where: {usuario_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Persona eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la persona con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando persona con id=" + id,
    });
  }
};

// Borrar todas las personas
const deleteAll = async (_req, _res) => { };

export {create, findAll, findOne, update, _delete, deleteAll};
