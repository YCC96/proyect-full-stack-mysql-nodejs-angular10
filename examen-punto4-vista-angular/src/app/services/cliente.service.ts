import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( private _http:HttpClient ) { }

  getClientes():any {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    const URL = 'http://127.0.0.1:3000/NutriNET/Clientes';
    return this._http.get( URL, { headers });
  }

  setCliente(newCliente):any {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    const URL = 'http://127.0.0.1:3000/NutriNET/Cliente';
    return this._http.post( URL, newCliente, { headers });
  }
  updateCliente(clienteID, dataCliente):any {
    console.log('*_* service: ', clienteID, dataCliente);
    
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    const URL = 'http://127.0.0.1:3000/NutriNET/Cliente/' + clienteID;
    return this._http.put( URL, dataCliente, { headers });
  }
}
