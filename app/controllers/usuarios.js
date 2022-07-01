/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import usuario from "../models/usuario.js";
const Usuario = usuario(db.sequelize, db.DataTypes);

// Crear y guardar un nuevo usuario
const create = async (req, res) => {
  // Validar la petición
  if (!req.body.title) {
    res.status(400).send({
      message: "No puede estar vacío.",
    });
    return;
  }

  const usuario = {...req.body};

  // Guardar el usuario
  try {
    const data = await Usuario.create(usuario);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Ocurrió un error al intentar crear el usuario.",
    });
  }
};

// Obtener todos los usuarios
const findAll = async (_req, res) => {
  try {
    const data = await Usuario.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        err.message ||
        "Ocurrió un error al intentar obtener la lista de usuarios",
    });
  }
};

// Encontrar un usuario según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Usuario.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el usuario con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener usuario con id=" + id,
    });
  }
};

// Actualizar usuario según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Usuario.update(req.body, {
      where: {usuario_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Usuario actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el usuario con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando usuario con id=" + id,
    });
  };
};

// Eliminar usuario según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Usuario.destroy({
      where: {usuario_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Usuario eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el usuario con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando usuario con id=" + id,
    });
  }
};

// Borrar todos los usuarios
const deleteAll = async (_req, res) => {
  try {
    const data = Usuario.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} usuarios fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Ocurrió un error al intentar eliminar los usuarios",
    });
  }
};

const authenticarUsuarioConEmail = (usuario) => {
  return new Promise((resolve, reject) => {
    try {
      Usuario.findOne({
        where: {
          email: usuario.email,
        },
      }).then(async (response) => {
        if (!response) {
          resolve(false);
        } else {
          if (!response.dataValues.password ||
            !await response.validPassword(usuario.password,
                response.dataValues.password)) {
            resolve(false);
          } else {
            resolve(response.dataValues);
          }
        }
      });
    } catch (error) {
      const response = {
        status: 500,
        data: {},
        error: {
          message: "usuario match failed",
        },
      };
      reject(response);
    }
  });
};

export {
  create,
  findAll,
  findOne,
  update,
  _delete,
  deleteAll,
  authenticarUsuarioConEmail,
};
