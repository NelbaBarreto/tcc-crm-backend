/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar un nuevo lead
const create = async (req, res) => {
  const lead = req.body;

  // Guardar el lead
  try {
    const data = await db.lead.create(lead, {
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
        error.message || "Ocurrió un error al intentar crear el lead.",
    });
  }
};

// Obtener todos los leads
const findAll = async (_req, res) => {
  try {
    const data = await db.lead.findAll({
      include:
        [{
          model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"}],
        },
        {model: db.campana},
        {model: db.usuario, as: "usu_asignado"},
        {model: db.curso},
        ],
      order: [
        ["fec_insercion", "DESC"],
      ],
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de leads",
    });
  }
};

// Encontrar un lead según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.lead.findByPk(id, {
      include:
        [{
          model: db.persona, as: "persona",
          include: [{model: db.direccion, as: "direcciones"},
            {model: db.telefono, as: "telefonos"}],
        },
        {model: db.campana},
        {model: db.usuario, as: "usu_asignado"},
        {model: db.curso},
        ],
    });

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar el lead con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el lead con id=" + id,
    });
  }
};

const getEstados = async (_req, res) => {
  try {
    const data = db.lead.estados ? db.lead.estados : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener estados.",
    });
  }
};

const getOrigenes = async (_req, res) => {
  try {
    const data = db.lead.origenes ? db.lead.origenes : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener orígenes.",
    });
  }
};

// Actualizar lead según su id
const update = async (req, res) => {
  try {
    const data = await db.lead.update(req.body.lead, {
      where: {lead_id: req.body.id},
      include:
          [{
            model: db.persona, as: "persona",
            include: [{model: db.direccion, as: "direcciones"},
              {model: db.telefono, as: "telefonos"}],
          }],
    });

    if (data == 1) {
      res.status(200).json({
        message: "Lead actualizado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar el lead con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando el lead con id=" + id,
    });
  };
};

// Eliminar lead según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.lead.destroy({
      where: {lead_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Lead eliminado correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar el lead con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando lead con id=" + id,
    });
  }
};

// Borrar todos los leads
const deleteAll = async (_req, res) => {
  try {
    const data = db.lead.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} leads fueron eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar eliminar los leads",
    });
  }
};

export {
  create, findAll, findOne, getEstados, getOrigenes, update, _delete, deleteAll,
};
