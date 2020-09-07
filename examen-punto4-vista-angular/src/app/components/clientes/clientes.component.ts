import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listClientes:any = [];
  textoTitle:string = '';
  textoModal:string = '';
  dataNewCliente:any = {
    nombre_usuario: "YDCCc",
    contrasena: "welcome1",
    nombre: "Yonathan David",
    apellidos: "Cruz Pérez",
    correo_electronico: "ydccc@gmail.com"
  }
  dataEditClient:any = {
    edad: 24,
    estatura: 1.65,
    peso: 65,
    geb: 10
  }
  clientIdEdit:number = 0;

  constructor( private _clientes:ClienteService, private _router:Router) { }

  ngOnInit(): void {
    this.cargaInicial();
  }

  cargaInicial(){
    this._clientes.getClientes().subscribe(resp => {
      console.log('*_* resp: ', resp);
      this.listClientes = resp.response;
    }, error => {
      this._router.navigate(['/error']);
    });
  }

  newCliente(){
    this._clientes.setCliente(this.dataNewCliente).subscribe(resp => {
      console.log('*_* nuevo resp: ', resp);
      if (resp.cve_Error === 0) {
        this.cargaInicial();
        $('#modalNewCliente').modal('hide');
        setTimeout(() => {
          this.textoTitle = 'Exito';
          this.textoModal = 'Se creo usuario con éxito!';
          $('#modalError').modal('show');
        }, 10);
      } else{
        this.textoTitle = 'Error';
        this.textoModal = resp.cve_Mensaje.sqlMessage
        setTimeout(() => {
          $('#modalError').modal('show');
        }, 10);
      }
    }, error => {
      console.log('*_* error: ', error);
      $('#modalNewCliente').modal('hide');
      setTimeout(() => {
        this._router.navigate(['/error']);
      }, 10);
    });
  }

  abrirModalNewCliente(){
    this.dataNewCliente.nombre_usuario = '';
    this.dataNewCliente.contrasena = '';
    this.dataNewCliente.nombre = '';
    this.dataNewCliente.apellidos = '';
    this.dataNewCliente.correo_electronico = '';
    $('#modalNewCliente').modal('show');
  }

  editarCliente(clienteID){
    this.clientIdEdit = clienteID;
    console.log('*_* ----- : ');
    var lll = this.listClientes.filter(clienteId => {
      return clienteId.cliente_id === clienteID
    });

    this.dataEditClient.edad = lll[0].edad
    this.dataEditClient.estatura = lll[0].estatura
    this.dataEditClient.peso = lll[0].peso
    this.dataEditClient.geb = lll[0].geb
    console.log('*_* ----- : ', lll);
    
    $('#modalEditClient').modal('show');
  }

  editCliente(){
    let data = {
      edad: +this.dataEditClient.edad,
      estatura: +this.dataEditClient.estatura,
      peso: +this.dataEditClient.peso,
      geb: +this.dataEditClient.geb
    }
    this._clientes.updateCliente(this.clientIdEdit, data).subscribe(resp => {
      if (resp.cve_Error === 0) {
        this.cargaInicial();
        $('#modalEditClient').modal('hide');
        setTimeout(() => {
          this.textoTitle = 'Exito';
          this.textoModal = 'Se editó cliente con éxito!';
          $('#modalError').modal('show');
        }, 10);
      } else{
        this.textoTitle = 'Error';
        this.textoModal = resp.cve_Mensaje.sqlMessage
        setTimeout(() => {
          $('#modalError').modal('show');
        }, 10);
      }
    },error => {

    })
  }

}
