import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { ModeloCategoria } from 'src/app/modelos/categoria.modelo';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrls: ['./crear-categorias.component.css'],
})
export class CrearCategoriasComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    id: ['', []],
  });

  // variables locales para usar en el fronted
  id_modal?: string;
  clase = 'Agregar';
  loading: boolean = false;

  constructor(
    public dialogRef: DialogRef<CrearCategoriasComponent>, // para mostrar modales
    private fb: FormBuilder, // formulario
    private servicioCategoria: CategoriaService,
    private _snackBar: MatSnackBar, // para mostrar mensajes
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id_modal = data.id;
  }

  ngOnInit(): void {
    this.esEditar(this.id_modal);
  }

  setGuardarcategoria() {
    this.loading = true;
    if (this.clase == 'Agregar') {
      this.setAdd();
    } else {
      this.setUpdate();
    }
  }

  // agregar
  setAdd() {
    let nombre = this.fgValidador.controls['nombre'].value;
    let datos = new ModeloCategoria();
    datos.nombre = nombre;
    this.servicioCategoria.setAdd(datos).subscribe(
      (datos: ModeloCategoria) => {
        this.cancelar();
        this.mensajeExito('agregada');
      },
      (error: any) => {}
    );
  }

  // actualizar
  setUpdate() {
    let nombre = this.fgValidador.controls['nombre'].value;
    let codigo = this.fgValidador.controls['id'].value;
    let datos = new ModeloCategoria();
    datos.nombre = nombre;
    datos.id = codigo;

    this.servicioCategoria.setUpdate(datos).subscribe(
      (datos: ModeloCategoria) => {
        this.cancelar();
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

  //cerrar el modal
  cancelar() {
    this.dialogRef.close();
  }

  // buscar el dato en el backend y mostrarlo en el frontend
  GetBuscar(id: string) {
    this.servicioCategoria
      .getListarId(id)
      .subscribe((datos: ModeloCategoria) => {
        this.fgValidador.controls['nombre'].setValue(datos.nombre);
        this.fgValidador.controls['id'].setValue(datos.id);
      });
  }

  mensajeExito(estado_operacion: string) {
    this._snackBar.open(
      `La categoria modelo fue ${estado_operacion} con exito`,
      '',
      {
        duration: 2000,
      }
    );
    window.location.reload();
  }
}
