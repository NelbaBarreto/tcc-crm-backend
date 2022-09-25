/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo país
const create = async (req, res) => {
  const pais = {...req.body};

  // Guardar el pais
  try {
    const data = await db.pais.create(pais);

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

// Obtener todos los paises
const findAll = async (_req, res) => {
  try {
    const data = await db.pais.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de paises",
    });
  }
};

// Encontrar un pais según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.pais.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el pais con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener pais con id=" + id,
    });
  }
};

// Actualizar pais según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.pais.update(req.body, {
      where: {pais_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "País actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el pais con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando pais con id=" + id,
    });
  };
};

// Eliminar pais según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.pais.destroy({
      where: {pais_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "País eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el pais con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando pais con id=" + id,
    });
  }
};

// Borrar todos los paises
const deleteAll = async (_req, res) => {
  try {
    const data = db.pais.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} paises fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los paises",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
