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
    return this.http.get<ModeloClientes[]>(`${this.url}/clientes`);
  }

  // obtener todos los registros por id
  getListarId(id: string): Observable<ModeloClientes> {
    return this.http.get<ModeloClientes>(`${this.url}/clientes/${id}`);
  }

  // agregar una nuevo cliente
  setAdd(categoria: ModeloClientes): Observable<ModeloClientes> {
    return this.http.post<ModeloClientes>(
      `${this.url}/clientes`,
      categoria,
      {
        headers: new HttpHeaders({
          Authorizacion: `Bearer ${this.token}`,
        }),
      }
    );
  }

  // editar un cliente
  setUpdate(categoria: ModeloClientes): Observable<ModeloClientes> {
    return this.http.patch<ModeloClientes>(
      `${this.url}/clientes/${categoria.id}`,
      categoria,
      {
        headers: new HttpHeaders({
          Authorizacion: `Bearer ${this.token}`,
        }),
      }
    );
  }

  // eliminar cliente
  setDelete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/clientes/${id}`, {
      headers: new HttpHeaders({
        Authorizacion: `Bearer ${this.token}`,
      }),
    });
  }
}
