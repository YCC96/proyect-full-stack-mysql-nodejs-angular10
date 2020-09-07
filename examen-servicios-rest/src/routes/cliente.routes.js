module.exports = app => {
    const Usuario = require('../controller/cliente.controller');
  
    app.get("/NutriNET/Clientes", Usuario.findAll);
  
    app.get("/NutriNET/Cliente/:usuarioId", Usuario.findOne);

    app.post("/NutriNET/Cliente", Usuario.create);

    app.put("/NutriNET/Cliente/:clienteId", Usuario.update);
  };