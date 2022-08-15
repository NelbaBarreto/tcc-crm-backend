/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import usuario from "../models/usuario.js";
const Usuario = usuario(db.sequelize, db.DataTypes);

// Crear y guardar un nuevo usuario
const create = async (req, res) => {
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
        error.message || "Ocurrió un error al intentar crear el usuario.",
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
        error.message ||
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
        error.message || "Ocurrió un error al intentar eliminar los usuarios",
    });
  }
};

const autenticarUsuario = async (req, res, next) => {
  const user = await db.usuario.findOne({where: {nom_usuario: req.body.nom_usuario}});
  if (user) {
    const password_valid = await db.usuario.validPassword(req.body.password, user.password);
    if (password_valid) {
      let token = jwt.sign({"usuario_id": user.usuario_id, "nom_usuario": user.nom_usuario, "nombre": user.nombre}, process.env.SECRET);
      res.status(200).json({token: token});
    } else {
      res.status(400).json({error: "Password Incorrect"});
    }
  } else {
    res.status(404).json({error: "User does not exist"});
  }
};

export {
  create,
  findAll,
  findOne,
  update,
  _delete,
  deleteAll,
  autenticarUsuario,
};
