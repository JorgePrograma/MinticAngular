import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloClientes } from '../modelos/cliente.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:3000';
  token: string = '';

  constructor(
    private http: HttpClient,
    //seguridad
    private seguridadServicio: SeguridadService
  ) {
    // captura el token del usuario
    this.token = seguridadServicio.ObtenerToken();
  }

  // metodos del crud

  // obtener todos los registros
  getListar(): Observable<ModeloClientes[]> {
    return this.http.get<ModeloClientes[]>(`${this.url}/clientes`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  // obtener todos los registros por id
  getListarId(id: string): Observable<ModeloClientes> {
    return this.http.get<ModeloClientes>(`${this.url}/clientes/${id}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  // agregar una nuevo cliente
  setAdd(cliente: ModeloClientes): Observable<ModeloClientes> {
    return this.http.post<ModeloClientes>(
      `${this.url}/clientes`,
      cliente,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  // editar un cliente
  setUpdate(cliente: ModeloClientes): Observable<ModeloClientes> {
    return this.http.patch<ModeloClientes>(
      `${this.url}/clientes/${cliente.id}`,
      cliente,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  // eliminar cliente
  setDelete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/clientes/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  setDeleteFull(id: string): Observable<any> {
    return this.http.delete(`${this.url}/clientes/${id}/vehiculos`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
