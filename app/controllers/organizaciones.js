/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva organizacion
const create = async (req, res) => {
  const organizacion = {...req.body};

  // Guardar la organizacion
  try {
    const data = await db.organizacion.create(organizacion, {
      include:
        [{
          model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"},
            {model: db.telefono, as: "telefonos"}],
        }],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la organización.",
    });
  }
};

// Obtener todos las organizaciones
const findAll = async (_req, res) => {
  try {
    const data = await db.organizacion.findAll({
      include:
        [{
          model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"}],
        },
        ],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de organizaciones",
    });
  }
};

// Encontrar una organizacion según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.organizacion.findByPk(id,
        {include:
          [{
            model: db.persona, as: "persona",
            include: [{model: db.direccion, as: "direcciones"},
              {model: db.telefono, as: "telefonos"}],
          }]});

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la organizacion con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la organizacion con id=" + id,
    });
  }
};

// Actualizar organizacion según su id
const update = async (req, res) => {
  try {
    const data = await db.organizacion.update(req.body.organizacion, {
      where: {organizacion_id: req.body.id},
      include:
          [{
            model: db.persona, as: "persona",
            include: [{model: db.direccion, as: "direcciones"},
              {model: db.telefono, as: "telefonos"}],
          }],
    });

    if (data == 1) {
      res.status(200).json({
        message: "Organización actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la organizacion con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la organizacion con id=" + id,
    });
  };
};

// Eliminar organizacion según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.organizacion.destroy({
      where: {lead_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Organizacion eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la organizacion con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando la organizacion con id=" + id,
    });
  }
};

// Borrar todas las organizaciones
const deleteAll = async (_req, res) => {
  try {
    const data = db.organizacion.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} organizaciones fueron eliminadas correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        // eslint-disable-next-line max-len
        error.message || "Ocurrió un error al intentar eliminar las organizaciones",
    });
  }
};

export {create, findAll, findOne, update, _delete, deleteAll};
