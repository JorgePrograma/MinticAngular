import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ModeloCategoria } from 'src/app/modelos/categoria.modelo';
import { ModeloClientes } from 'src/app/modelos/cliente.modelo';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-crear-vehiculos',
  templateUrl: './crear-vehiculos.component.html',
  styleUrls: ['./crear-vehiculos.component.css'],
})
export class CrearVehiculosComponent implements OnInit {
  listaClientes: ModeloClientes[] = [];
  listaCategoria: ModeloCategoria[] = [];
  listaEstados: string[] = ['Reparacion', 'Revision', 'Mantenimiento'];

  // validador de campos del formulario
  fgValidador: FormGroup = this.fb.group({
    id: ['', []],
    color: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    serie_motor: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    placa: ['', [Validators.required]],
    servicioId: ['', []],
    categoriaMarcaId: [null, Validators.required],
    clienteId: [null, Validators.required],
  });

  // variables locales
  clase = 'Registrar';
  loading: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder, // formulario
    private servicioVehiculo: VehiculoService,
    private servicioCategoria: CategoriaService,
    private clienteServicio: ClienteService,
    private _snackBar: MatSnackBar, // para mostrar mensajes
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.esEditar(this.id);
    this.getListarClientes();
    this.getListarCategorias();
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
    let color = this.fgValidador.controls['color'].value;
    let modelo = this.fgValidador.controls['modelo'].value;
    let serie_motor = this.fgValidador.controls['serie_motor'].value;
    let estado = this.fgValidador.controls['estado'].value;
    let placa = this.fgValidador.controls['placa'].value;
    let servicioId = this.fgValidador.controls['servicioId'].value;

    // captura nuevos
    let clienteId = this.fgValidador.controls['clienteId'].value;
    let categoriaMarcaId = this.fgValidador.controls['categoriaMarcaId'].value;
    let datos = new ModeloVehiculo();

    datos.color = color;
    datos.modelo = modelo;
    datos.serie_motor = serie_motor;
    datos.estado = estado;
    datos.placa = placa;

    // campos nuevos
    datos.clienteId = clienteId;
    datos.categoriaMarcaId = categoriaMarcaId;
    datos.servicioId = servicioId;

    this.servicioVehiculo.setAdd(datos,clienteId).subscribe(
      (datos: ModeloVehiculo) => {
        this.mensajeExito('registrado');
        console.log('mensaje', datos);
      },
      (error: any) => {}
    );
  }

  // actualizar
  setUpdate() {
    let color = this.fgValidador.controls['color'].value;
    let modelo = this.fgValidador.controls['modelo'].value;
    let serie_motor = this.fgValidador.controls['serie_motor'].value;
    let estado = this.fgValidador.controls['estado'].value;
    let placa = this.fgValidador.controls['placa'].value;
    let servicioId = this.fgValidador.controls['servicioId'].value;
    let codigo = this.fgValidador.controls['id'].value;
    let clienteId = this.fgValidador.controls['clienteId'].value;
    let categoriaMarcaId = this.fgValidador.controls['categoriaMarcaId'].value;

    let datos = new ModeloVehiculo();
    datos.id = codigo;
    datos.color = color;
    datos.modelo = modelo;
    datos.serie_motor = serie_motor;
    datos.estado = estado;
    datos.placa = placa;
    datos.servicioId = servicioId;
    datos.clienteId = clienteId;
    datos.categoriaMarcaId = categoriaMarcaId;

    this.servicioVehiculo.setUpdate(datos).subscribe(
      (datos: ModeloVehiculo) => {
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
    this.servicioVehiculo.getListarId(id).subscribe((datos: ModeloVehiculo) => {
      console.log(datos);

      this.fgValidador.controls['id'].setValue(datos.id);
      this.fgValidador.controls['color'].setValue(datos.color);
      this.fgValidador.controls['modelo'].setValue(datos.modelo);
      this.fgValidador.controls['serie_motor'].setValue(datos.serie_motor);
      this.fgValidador.controls['estado'].setValue(datos.estado);
      this.fgValidador.controls['placa'].setValue(datos.placa);
      this.fgValidador.controls['servicioId'].setValue(datos.servicioId);
      this.fgValidador.controls['clienteId'].setValue(datos.clienteId);
      this.fgValidador.controls['categoriaMarcaId'].setValue(
        datos.categoriaMarcaId
      );
    });
  }

  getListarClientes() {
    this.clienteServicio.getListar().subscribe((datos: ModeloClientes[]) => {
      this.listaClientes = datos;
    });
  }

  getListarCategorias() {
    this.servicioCategoria.getListar().subscribe((datos: ModeloCategoria[]) => {
      this.listaCategoria = datos;
    });
  }

  mensajeExito(estado_operacion: string) {
    this._snackBar.open(`El vehiculo fue ${estado_operacion} con exito`, '', {
      duration: 2000,
    });
    this.router.navigate(['/productos/listar-vehiculos']);
  }

  getError(campo: string) {
    return this.fgValidador.controls[campo].hasError('required')
      ? ' Este campo es requerido'
      : '';
  }
}
