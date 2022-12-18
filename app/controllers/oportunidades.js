/* eslint-disable require-jsdoc */
import db from "../models/index.js";

// Crear y guardar una nueva oportunidad
const create = async (req, res) => {
  const oportunidad = {...req.body};

  // Guardar la oportunidad
  try {
    const data = await db.oportunidad.create(oportunidad);

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al intentar crear la oportunidad.",
    });
  }
};

// Obtener todas las oportunidades
const findAll = async (_req, res) => {
  try {
    const data = await db.oportunidad.findAll();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Ocurrió un error al intentar obtener la lista de oportunidades",
    });
  }
};

// Encontrar una oportunidad según su id
const findOne = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.oportunidad.findByPk(id);

    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).send({
        message: `No se pudo encontrar la oportunidad con el id=${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener la oportunidad con id=" + id,
    });
  }
};

// Actualizar oportunidad según su id
const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.oportunidad.update(req.body, {
      where: {oportunidad_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Oportunidad actualizada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo actualizar la oportunidad con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error actualizando la oportunidad con id=" + id,
    });
  };
};

// Eliminar oportunidad según su id
const _delete = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await db.oportunidad.destroy({
      where: {oportunidad_id: id},
    });

    if (data == 1) {
      res.status(200).json({
        message: "Oportunidad eliminada correctamente",
      });
    } else {
      res.status(200).json({
        message: "No se pudo eliminar la oportunidad con id=" + id,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error eliminando la oportunidad con id=" + id,
    });
  }
};

// Borrar todos las oportunidades
const deleteAll = async (_req, res) => {
  try {
    const data = db.oportunidad.destroy({
      where: {},
      truncate: false,
    });

    if (data == 1) {
      res.status(200).json({
        message: `${data} oportunidades fueron eliminadas correctamente`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        // eslint-disable-next-line max-len
        error.message || "Ocurrió un error al intentar eliminar las oportunidades",
    });
  }
};

// const getTotalSales = async (_req, res) => {
//   try {
//     const data = db.oportunidad.destroy({
//       where: {},
//       truncate: false,
//     });

//     if (data == 1) {
//       res.status(200).json({
//         message: `${data} oportunidades fueron eliminadas correctamente`,
//       });
//     }
//   } catch (error) {
//     res.status(500).send({
//       message:
//         // eslint-disable-next-line max-len
//         error.message ||
// "Ocurrió un error al intentar eliminar las oportunidades",
//     });
//   }
// };

const getEtapas = async (_req, res) => {
  try {
    const data = db.oportunidad.etapas ? db.oportunidad.etapas : [];
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener etapas.",
    });
  }
};

export {create, findAll, findOne, update, getEtapas, _delete, deleteAll};
