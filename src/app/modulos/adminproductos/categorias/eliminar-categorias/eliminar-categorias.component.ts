import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModeloCategoria } from 'src/app/modelos/categoria.modelo';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-eliminar-categorias',
  templateUrl: './eliminar-categorias.component.html',
  styleUrls: ['./eliminar-categorias.component.css'],
})
export class EliminarCategoriasComponent implements OnInit {
  id_modal: string;
  loading: boolean = false;
  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });
  constructor(
    public dialogRef: DialogRef<EliminarCategoriasComponent>, // para mostrar modales
    private servicioCategoria: CategoriaService,
    private fb: FormBuilder, // formulario
    private _snackBar: MatSnackBar, // para mostrar mensajes
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id_modal = data.id;
    this.GetBuscar(this.id_modal);
  }

  ngOnInit(): void {}

  setDelete() {
    this.loading = true;
    let codigo = this.fgValidador.controls['id'].value;
    this.servicioCategoria.setDelete(codigo).subscribe(
      (datos: ModeloCategoria) => {
        this.cancelar();
        this.mensajeExito();
      },
      (error: any) => {}
    );
  }

  // buscar el dato en el backend y mostrarlo en el frontend
  GetBuscar(id: string) {
    this.servicioCategoria
      .getListarId(id)
      .subscribe((datos: ModeloCategoria) => {
        this.fgValidador.controls['id'].setValue(datos.id);
      });
  }

  mensajeExito() {
    this._snackBar.open(`La categoria se elimino con exito`, '', {
      duration: 2000,
    });
    this.router.navigate(['/productos/listar-categorias']);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
