const Cliente = require("../models/cliente.models");

// Create and Save a new Customer
exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Cliente.findById(req.params.usuarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.usuarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.usuarioId
        });
      }
    } else res.send(data);
  });
};

exports.create = (req, res) => {
    var date = new Date();
    var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDay()
    let data = {
      ...req.body,
      fecha_creacion: fecha
    }
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    Cliente.create(data, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."
        });
        else res.send(data);
    });
};

exports.update = (req, res) => {
  var date = new Date();
  var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDay()
  let data = {
    ...req.body,
    fecha_actualizacion: fecha
  }
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Cliente.updateById(req.params.clienteId, data, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.clienteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.clienteId
          });
        }
      } else res.send(data);
    }
  );
};