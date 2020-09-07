const sql = require('./db.js');

const Cliente = function(cliente) {

}

Cliente.getAll = result => {
    sql.query('select * from clientes', (err, res) => {
        var dataResult = {
            cve_Error: 0,
            cve_Mensaje: '',
            response: null
        }
        if (err) {
            dataResult.cve_Error = -1;
            dataResult.cve_Mensaje = err;
            result(null, err);
            return;
        } else{
            dataResult.cve_Error = 0;
            dataResult.cve_Mensaje = 'success';
            dataResult.response = res;
            result(null, dataResult);
        }
    })
}

Cliente.findById = (clienteId, result) => {
    sql.query(`select * from clientes where cliente_id = ${clienteId}`, (err, res) => {
        var dataResult = {
            cve_Error: 0,
            cve_Mensaje: '',
            response: null
        }
        if (err) {
            dataResult.cve_Error = -1;
            dataResult.cve_Mensaje = err;
            result(null, dataResult);
        }
    
        if (res.length) {
            dataResult.cve_Error = 0;
            dataResult.cve_Mensaje = 'success';
            dataResult.response = res[0];
            result(null, dataResult);
        } else {
            dataResult.cve_Error = 0;
            dataResult.cve_Mensaje = 'Not found';
            dataResult.response = [];
            result( null, dataResult);
        }
    
    });
  };

  Cliente.create = (newCliente, result) => {
    sql.query("insert into clientes set ?", newCliente, (err, res) => {
        var dataResult = {
            cve_Error: -1,
            cve_Mensaje: 'Not Found',
            response: null
        }
        if (err) {
            dataResult.cve_Error = -1;
            dataResult.cve_Mensaje = err;
            result(null, dataResult);
        } else{
            dataResult.cve_Error = 0;
            dataResult.cve_Mensaje = 'success';
            dataResult.response = res;
            result(null, dataResult);
        }
    
        });
  };

  Cliente.updateById = (id, cliente, result) => {
    sql.query("update clientes set edad = ?, estatura = ?, peso = ?, geb = ?, fecha_actualizacion = ? where cliente_id = ?",
        [cliente.edad, cliente.estatura, cliente.peso, cliente.geb, cliente.fecha_actualizacion, id], (err, res) => {
        var dataResult = {
            cve_Error: 0,
            cve_Mensaje: 'Success',
            response: res
        }
        if (err) {
            dataResult.cve_Error = -1;
            dataResult.cve_Mensaje = err;
            result(null, dataResult);
        }

        if (res.affectedRows == 0) {
            dataResult.cve_Error = -1;
            dataResult.cve_Mensaje = 'Not Found';
            result(null, dataResult);
        }
  
        result(null, dataResult);
      }
    );
  };

module.exports = Cliente;