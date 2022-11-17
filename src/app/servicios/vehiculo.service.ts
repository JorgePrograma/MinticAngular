import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloVehiculo } from '../modelos/vehiculo.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
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
  getListar(): Observable<ModeloVehiculo[]> {
    return this.http.get<ModeloVehiculo[]>(`${this.url}/vehiculos`);
  }

  // obtener todos los registros por id
  getListarId(id: string): Observable<ModeloVehiculo> {
    return this.http.get<ModeloVehiculo>(`${this.url}/vehiculos/${id}`);
  }

  // agregar una nuevo vehiculo
  setAdd(vehiculo: ModeloVehiculo): Observable<ModeloVehiculo> {
    return this.http.post<ModeloVehiculo>(
      `${this.url}/vehiculos`,
      vehiculo,
      {
        headers: new HttpHeaders({
          Authorizacion: `Bearer ${this.token}`
        })
      }
    )
  }

  // editar un vehiculo
  setUpdate(vehiculo: ModeloVehiculo): Observable<ModeloVehiculo> {
    return this.http.patch<ModeloVehiculo>(
      `${this.url}/vehiculos/${vehiculo.id}`,
      vehiculo,
      {
        headers: new HttpHeaders({
          Authorizacion: `Bearer ${this.token}`,
        }),
      }
    );
  }

  // eliminar vehiculo
  setDelete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/vehiculos/${id}`, {
      headers: new HttpHeaders({
        Authorizacion: `Bearer ${this.token}`,
      }),
    });
  }

}
