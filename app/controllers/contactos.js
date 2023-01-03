/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import jwt from "jsonwebtoken";

// Crear y guardar un nuevo contacto
const create = async (req, res) => {
  const contacto = {...req.body};

  // Guardar el contacto
  try {
    const data = await db.contacto.create(contacto);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear el contacto.",
    });
  }
};

// Obtener todos los contactos
const findAll = async (_req, res) => {
  try {
    const data = await db.contacto.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de contactos",
    });
  }
};

// Encontrar un contacto según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.contacto.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el contacto con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el contacto con id=" + id,
    });
  }
};

// Actualizar contacto según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.contacto.update(req.body, {
      where: {contacto_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Contacto actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el contacto con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el contacto con id=" + id,
    });
  };
};

// Eliminar contacto según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.contacto.destroy({
      where: {contacto_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Contacto eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el contacto con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando contacto con id=" + id,
    });
  }
};

// Borrar todos los contactos
const deleteAll = async (_req, res) => {
  try {
    const data = db.contacto.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} contactos fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los contactos",
    });
  }
};

const generarTokenEncuesta = async (req, res) => {
  try {
    const contacto = req.params.contacto;
    const oportunidad = req.params.oportunidad;

    const payload = {
      contacto,
      oportunidad,
    };

    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "2d"});

    res.status(200).send({
      token,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar generar el token",
    });
  }
};

const validarTokenEncuesta = async (req, res) => {
  try {
    const contacto = req.params.contacto;
    const oportunidad = req.params.oportunidad;

    const payload = {
      contacto,
      oportunidad,
    };

    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "2d"});

    res.status(200).send({
      token,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar validar el token",
    });
  }
};

export {create, findAll, findOne, update, generarTokenEncuesta,
  validarTokenEncuesta, _delete, deleteAll};
