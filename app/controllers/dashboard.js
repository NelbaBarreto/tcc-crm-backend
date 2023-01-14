/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import {QueryTypes} from "sequelize";

// Crear y guardar un nuevo caso
const casosPorEstado = async (req, res) => {
  // Guardar el caso
  try {
    const data = await db.sequelize.query(
        "SELECT count(1) as total, estado FROM CASOS GROUP BY ESTADO",
        {
          type: QueryTypes.SELECT,
        },
    );

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
                error.message || "Ocurrió un error al intentar crear el caso.",
    });
  }
};

export {casosPorEstado};

