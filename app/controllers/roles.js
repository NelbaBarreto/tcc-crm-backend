/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo rol
const create = async (req, res) => {
  const rol = {...req.body};

  // Guardar el rol
  try {
    const data = await db.rol.create(rol);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el rol.",
    });
  }
};

// Obtener todos los roles
const findAll = async (_req, res) => {
  try {
    const data = await db.rol.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de roles",
    });
  }
};

// Encontrar un rol según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.rol.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el rol con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el rol con id=" + id,
    });
  }
};

// Actualizar rol según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.rol.update(req.body, {
      where: {rol_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Rol actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el rol con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el rol con id=" + id,
    });
  };
};

// Eliminar rol según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.rol.destroy({
      where: {rol_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Rol eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el rol con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando el rol con id=" + id,
    });
  }
};

// Borrar todos los roles
const deleteAll = async (_req, res) => {
  try {
    const data = db.rol.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} roles fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los roles",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
