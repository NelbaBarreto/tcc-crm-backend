/* eslint-disable require-jsdoc */
import db from "../models/index.js";
import persona from "../models/persona.js";
const Persona = persona(db.sequelize, db.DataTypes);

// Crear y guardar una nueva persona
export function create(req, res) {

}
// Obtener todas las personas
export function findAll(req, res) {
  Persona.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
          err.message ||
            "Ocurrió un error al intentar obtener la lista de personas",
        });
      });
}

// Encontrar una persona según su id
export function findOne(req, res) {
  const {id} = req.params;

  Persona.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `No se pudo encontrar la persona con el id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Persona with id=" + id,
        });
      });
}
// Update a Persona by the id in the request
export function update(req, res) {
  const id = req.params.id;
  Persona.update(req.body, {
    where: {persona_id: id},
  })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Persona actualizada correctamente",
          });
        } else {
          res.send({
            message: `No se pudo actualizar persona con id=${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error actualizando persona con id=" + id,
        });
      });
}
// Delete a Persona with the specified id in the request
export function _delete(req, res) { };

// Delete all Personas from the database.
export function deleteAll(req, res) { }
