import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloCategoria } from '../modelos/categoria.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url = 'http://localhost:3000';
  token: string = '';

  constructor(
    private http: HttpClient,
    private seguridadServicio: SeguridadService
  ) {
    this.token = seguridadServicio.ObtenerToken();
  }

  // metodos del crud

  // obtener todos los registros
  getListar(): Observable<ModeloCategoria[]> {
    return this.http.get<ModeloCategoria[]>(`${this.url}/categoria-marcas`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  // obtener todos los registros por id
  getListarId(id: string): Observable<ModeloCategoria> {
    return this.http.get<ModeloCategoria>(`${this.url}/categoria-marcas/${id}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  // agregar una nueva categoria
  setAdd(categoria: ModeloCategoria): Observable<ModeloCategoria> {
    return this.http.post<ModeloCategoria>(
      `${this.url}/categoria-marcas`,
      categoria,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  // editar una nueva categoria
  setUpdate(categoria: ModeloCategoria): Observable<ModeloCategoria> {
    return this.http.patch<ModeloCategoria>(
      `${this.url}/categoria-marcas/${categoria.id}`,
      categoria,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  // eliminar categoria
  setDelete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/categoria-marcas/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
