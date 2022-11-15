import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  url = 'http://localhost:3000';
  datosUsuarioSesion = new BehaviorSubject<ModeloIdentificar>(
    new ModeloIdentificar()
  );
  constructor(private http: HttpClient) {
    this.VerificarSesion();
  }

  Identificar(usuario: string, clave: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(
      `${this.url}/identificarCliente`,
      {
        usuario: usuario,
        clave: clave,
      },
      { headers: new HttpHeaders({}) }
    );
  }

  // almacenamiento en el localstora que es la base de datos
  AlmacenarSesion(datos: ModeloIdentificar) {
    datos.estaIdentificado = true;
    let stringdatos = JSON.stringify(datos);
    localStorage.setItem('datosSesion', stringdatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerInformacionSession() {
    let datoString = localStorage.getItem('datosSesion');
    if (datoString) {
      let datos = JSON.parse(datoString);
      return datos;
    } else {
      return null;
    }
  }

  RefrescarDatosSesion(datos: ModeloIdentificar) {
    this.datosUsuarioSesion.next(datos);
  }

  EliminarInformacionSession() {
    localStorage.removeItem('datosSesion');
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }

  VerificarSesion() {
    let datos = this.ObtenerInformacionSession();
    if (datos) {
      this.RefrescarDatosSesion(datos);
    }
  }

  SeHaIniciadoSesion() {
    let datoString = localStorage.getItem('datosSesion');
    return datoString;
  }

  ObtenerDatosUsuarioEnSesion() {
    return this.datosUsuarioSesion.asObservable();
  }

  ObtenerToken() {
    let datoString = localStorage.getItem('datosSesion');
    if (datoString) {
      let datos = JSON.parse(datoString);
      return datos.tk;
    } else {
      return '';
    }
  }
}
