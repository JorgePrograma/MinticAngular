import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloClientes } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})

export class CrearClienteComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    id: ['', []],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    direccion: ['', [Validators.required]],
    edad: ['', []],
    fecha_nacimiento: ['', []],
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
    this.esEditar(this.id)
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
    let id = this.fgValidador.controls['id'].value;
    let nombre = this.fgValidador.controls['nombre'].value;
    let apellido = this.fgValidador.controls['apellido'].value;
    let cedula = this.fgValidador.controls['cedula'].value;
    let telefono = this.fgValidador.controls['telefono'].value;
    let correo = this.fgValidador.controls['correo'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let edad = this.fgValidador.controls['edad'].value;
    let fecha_nacimiento = this.fgValidador.controls['fecha_nacimiento'].value;
    let empresaId = 'jsjsjdjdhdhfggs';

    let datos = new ModeloClientes();
    datos.nombre = nombre;
    datos.apellido = apellido;
    datos.cedula = cedula;
    datos.telefono = telefono;
    datos.correo = correo;
    datos.direccion = direccion;
    datos.fecha_nacimiento = fecha_nacimiento;
    datos.empresaId = empresaId;
    datos.id = id;
    datos.edad = edad;

console.log(datos)
    this.servicioCliente.setAdd(datos).subscribe(
      (datos: ModeloClientes) => {
        this.mensajeExito('registrado');
      },
      (error: any) => {
        alert(datos.empresaId);
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
    let edad = this.fgValidador.controls['edad'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let codigo = this.fgValidador.controls['id'].value;

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
        this.mensajeExito('actualizada');
      },
      (error: any) => {}
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
    this.servicioCliente
      .getListarId(id)
      .subscribe((datos: ModeloClientes) => {
        this.fgValidador.controls['id'].setValue(datos.id);
        this.fgValidador.controls['nombre'].setValue(datos.nombre);
        this.fgValidador.controls['apellido'].setValue(datos.apellido);
        this.fgValidador.controls['cedula'].setValue(datos.cedula);
        this.fgValidador.controls['telefono'].setValue(datos.telefono);
        this.fgValidador.controls['correo'].setValue(datos.correo);
        this.fgValidador.controls['direccion'].setValue(datos.direccion);
        this.fgValidador.controls['edad'].setValue(datos.edad);
        this.fgValidador.controls['fecha_nacimiento'].setValue(datos.fecha_nacimiento);
        this.fgValidador.controls['clave'].setValue(datos.clave);
      });
  }

  mensajeExito(estado_operacion: string) {
    this._snackBar.open(
      `El cliente fue ${estado_operacion} con exito`,
      '',
      {
        duration: 2000,
      }
    );
    this.router.navigate(['/administracion/listar-clientes']);
  }
}
