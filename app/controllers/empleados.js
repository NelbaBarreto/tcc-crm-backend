/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo empleado
const create = async (req, res) => {
  const empleado = req.body;

  // Guardar el empleado
  try {
    const data = await db.empleado.create(empleado, {include:
      [{model: db.persona, as: "persona",
        include: [{model: db.direccion, as: "direcciones"},
          {model: db.telefono, as: "telefonos"}]}]});

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
    const data = await db.empleado.findAll({
      include:
        [{model: db.persona}, {model: db.usuario}],
    });

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
    const data = await db.empleado.findByPk(id, {
      include:
        [{model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"},
            {model: db.telefono, as: "telefonos"}]},
        {model: db.usuario}],
    });

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
    const data = await db.empleado.update(req.body, {
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
    const data = await db.empleado.destroy({
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
    const data = db.empleado.destroy({
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
