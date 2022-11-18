import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ModeloClientes } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})
export class CrearClienteComponent implements OnInit {
  hide = true;

  fgValidador: FormGroup = this.fb.group({
    id: ['', []],
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-zñÑ ]*')]],
    apellido: ['', [Validators.required, Validators.pattern('[a-zA-zñÑ ]*')]],
    cedula: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*'),
      ],
    ],
    correo: ['', [Validators.email, Validators.required]],
    direccion: ['', [Validators.required]],
    fecha_nacimiento: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    edad: ['', []],
    clave: ['', []],
    empresaId: ['', []],
  });

  // variables locales
  clase = 'Registrar';
  loading: boolean = false;
  id: string = '';
  constructor(
    private fb: FormBuilder, // formulario
    private servicioCliente: ClienteService,
    private _snackBar: MatSnackBar, // para mostrar mensajes
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.esEditar(this.id);
    this.fgValidador
      .get('fecha_nacimiento')
      ?.valueChanges.subscribe((value) => {
        this.calcularEdad();
      });
  }

  setGuardar() {
    this.loading = true;
    if (this.clase == 'Registrar') {
      this.setAdd();
    } else {
      this.setUpdate();
    }
  }

  // agregar
  setAdd() {
    let nombre = this.fgValidador.controls['nombre'].value;
    let apellido = this.fgValidador.controls['apellido'].value;
    let cedula = this.fgValidador.controls['cedula'].value;
    let telefono = this.fgValidador.controls['telefono'].value;
    let correo = this.fgValidador.controls['correo'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let fecha_nacimiento = this.fgValidador.controls['fecha_nacimiento'].value;
    let empresaId = 'la empresa mia';

    let datos = new ModeloClientes();
    datos.nombre = nombre;
    datos.apellido = apellido;
    datos.cedula = cedula;
    datos.telefono = telefono;
    datos.correo = correo;
    datos.direccion = direccion;
    datos.fecha_nacimiento = fecha_nacimiento;
    datos.empresaId = empresaId;

    this.servicioCliente.setAdd(datos).subscribe(
      (datos: ModeloClientes) => {
        this.mensajeExito('registrado');
      },
      (error: any) => {
        alert('error al registrar');
      }
    );
  }

  // actualizar
  setUpdate() {
    let nombre = this.fgValidador.controls['nombre'].value;
    let apellido = this.fgValidador.controls['apellido'].value;
    let cedula = this.fgValidador.controls['cedula'].value;
    let telefono = this.fgValidador.controls['telefono'].value;
    let correo = this.fgValidador.controls['correo'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let fecha_nacimiento = this.fgValidador.controls['fecha_nacimiento'].value;
    let edad = parseInt(this.fgValidador.controls['edad'].value);
    let clave = this.fgValidador.controls['clave'].value;
    let codigo = this.fgValidador.controls['id'].value;

    let claveDescifrada:string = clave;
    if (clave.length < 20) {
      claveDescifrada = CryptoJS.MD5(clave).toString();
    }
    clave = claveDescifrada

    let datos = new ModeloClientes();
    datos.id = codigo;
    datos.nombre = nombre;
    datos.apellido = apellido;
    datos.cedula = cedula;
    datos.telefono = telefono;
    datos.correo = correo;
    datos.direccion = direccion;
    datos.edad = edad;
    datos.fecha_nacimiento = fecha_nacimiento;
    datos.clave = clave;

    this.servicioCliente.setUpdate(datos).subscribe(
      (datos: ModeloClientes) => {
        console.log('detalles : ' + datos);
        this.mensajeExito('actualizada');
      },
      (error: any) => {
        alert(error);
        this.loading = false;
      }
    );
  }

  // validar si se va actualizar los datos
  esEditar(id: string | undefined) {
    if (id != undefined) {
      this.clase = 'Editar';
      this.GetBuscar(id);
    }
  }

  // buscar el dato en el backend y mostrarlo en el frontend
  GetBuscar(id: string) {
    this.servicioCliente.getListarId(id).subscribe((datos: ModeloClientes) => {
      this.fgValidador.controls['id'].setValue(datos.id);
      this.fgValidador.controls['nombre'].setValue(datos.nombre);
      this.fgValidador.controls['apellido'].setValue(datos.apellido);
      this.fgValidador.controls['cedula'].setValue(datos.cedula);
      this.fgValidador.controls['telefono'].setValue(datos.telefono);
      this.fgValidador.controls['correo'].setValue(datos.correo);
      this.fgValidador.controls['direccion'].setValue(datos.direccion);
      this.fgValidador.controls['fecha_nacimiento'].setValue(
        datos.fecha_nacimiento
      );
      this.calcularEdad();

      let clave2 = datos.clave;
      this.fgValidador.controls['fecha_nacimiento'].setValue(
        datos.fecha_nacimiento
      );
      this.fgValidador.controls['clave'].setValue(clave2);
    });
  }

  mensajeExito(estado_operacion: string) {
    this._snackBar.open(`El cliente fue ${estado_operacion} con exito`, '', {
      duration: 2000,
    });
    this.router.navigate(['/administracion/listar-clientes']);
  }

  // errores

  getError(campo: string) {
    if (campo == 'nombre' || campo == 'apellido') {
      return this.fgValidador.controls[campo].hasError('required')
        ? ' Este campo es requerido'
        : this.fgValidador.controls[campo].hasError('pattern')
        ? 'El campo solo permite letras'
        : '';
    } else if (campo == 'cedula') {
      return this.fgValidador.controls[campo].hasError('pattern')
        ? 'El campo solo permite numeros'
        : this.fgValidador.controls[campo].hasError('minlength')
        ? ' Este campo debe tener minimo 8 digitos'
        : this.fgValidador.controls[campo].hasError('maxlength')
        ? ' Este campo debe tener maximo 10 digitos'
        : this.fgValidador.controls[campo].hasError('required')
        ? ' Este campo es requerido'
        : '';
    } else if (campo == 'correo') {
      return this.fgValidador.controls[campo].hasError('email')
        ? ' El correo no es valido'
        : this.fgValidador.controls[campo].hasError('required')
        ? 'El campo es requerido'
        : '';
    }

    if (campo == 'fecha_nacimiento') {
      return this.fgValidador.controls[campo].hasError('required')
        ? ' Este campo es requerido'
        : '';
    }

    return this.fgValidador.controls[campo].hasError('required')
      ? ' Este campo es requerido'
      : this.fgValidador.controls[campo].hasError('email')
      ? 'email no valido'
      : '';
  }

  calcularEdad() {
    let fecha: string = this.fgValidador.controls['fecha_nacimiento'].value;
    let hoy = new Date();
    let cumpleaños = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleaños.getFullYear();
    let meses = hoy.getMonth() - cumpleaños.getMonth();
    if (meses <= 0 || (meses === 0 && hoy.getDate() < cumpleaños.getDate())) {
      edad--;
    }
    this.fgValidador.controls['edad'].setValue(edad);
    // return edad;
  }
}
