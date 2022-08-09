/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import empleado from "../models/empleado.js";
import persona from "../models/persona.js";
import usuario from "../models/usuario.js";

const Empleado = empleado(db.sequelize, db.DataTypes);
const Persona = persona(db.sequelize, db.DataTypes);
const Usuario = usuario(db.sequelize, db.DataTypes);

// Crear y guardar un nuevo empleado
const create = async (req, res) => {
  // Validar la petición
  /*if (!req.body.title) {
    res.status(400).send({
      message: "No puede estar vacío.",
    });
    return;
  }*/

  const empleado = {...req.body};

  // Guardar el empleado
  try {
    const data = await Empleado.create(empleado, {include:
      [{model: Persona}, {model: Usuario}],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Ocurrió un error al intentar crear el empleado.",
    });
  }
};

// Obtener todos los empleados
const findAll = async (_req, res) => {
  try {
    const data = await Empleado.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de empleados",
    });
  }
};

// Encontrar un empleado según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Empleado.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el empleado con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener empleado con id=" + id,
    });
  }
};

// Actualizar empleado según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Empleado.update(req.body, {
      where: {empleado_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Empleado actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el empleado con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando empleado con id=" + id,
    });
  };
};

// Eliminar empleado según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Empleado.destroy({
      where: {empleado_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Empleado eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el empleado con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando empleado con id=" + id,
    });
  }
};

// Borrar todos los empleados
const deleteAll = async (_req, res) => {
  try {
    const data = Empleado.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} empleados fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los empleados",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
