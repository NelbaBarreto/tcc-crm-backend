/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo perfil
const create = async (req, res) => {
  const perfil = {...req.body};

  // Guardar el perfil
  try {
    const data = await db.perfil.create(perfil);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el perfil.",
    });
  }
};

// Obtener todos los perfiles
const findAll = async (_req, res) => {
  try {
    const data = await db.perfil.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de perfiles",
    });
  }
};

// Encontrar un perfil según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.perfil.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el perfil con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el perfil con id=" + id,
    });
  }
};

// Actualizar perfil según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.perfil.update(req.body, {
      where: {perfil_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Perfil actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el perfil con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el perfil con id=" + id,
    });
  };
};

// Eliminar perfil según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.perfil.destroy({
      where: {perfil_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Perfil eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el perfil con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando el perfil con id=" + id,
    });
  }
};

// Borrar todos los perfiles
const deleteAll = async (_req, res) => {
  try {
    const data = db.perfil.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} perfiles fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los perfiles",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
