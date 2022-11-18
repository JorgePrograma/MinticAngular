import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css'],
})
export class IdentificacionComponent implements OnInit {
  hide = true;

  fgValidador: FormGroup = this.fb.group({
    usuario: ['', [Validators.email, Validators.required]],
    clave: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private _snackBar: MatSnackBar, // para mostrar mensajes
    private router: Router
  ) {}

  ngOnInit(): void {}

  IdentificarUsuario() {
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let claveCifrada = CryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe(
      (datos: any) => {
        this.servicioSeguridad.AlmacenarSesion(datos);
        this.router.navigate(['inicio']);
      },
      (error: any) => {
        this.mensajeExito();
      }
    );
  }

  mensajeExito() {
    this._snackBar.open(`Los datos ingresados no son validos`, '', {
      duration: 2000,
    });
  }

  getErrorCorreo() {
    return this.fgValidador.controls['usuario'].hasError('required') ? 'Este campo es requerido' :
        this.fgValidador.controls['usuario'].hasError('email') ? 'email no valido' :
            '';
  }

  getErrorClave() {
    return this.fgValidador.controls['clave'].hasError('required') ? 'Este campo es requerido' :
        this.fgValidador.controls['clave'].hasError('minlength') ? 'Contraseña debe tener minino 8 digitos' :
            '';
  }
}
