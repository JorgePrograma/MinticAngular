import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModeloClientes } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css'],
})
export class EliminarClienteComponent implements OnInit {
  // variables locales
  id_modal: string;
  loading: boolean = false;
  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });
  constructor(
    public dialogRef: DialogRef<EliminarClienteComponent>, // para mostrar modales
    private servicioCliente: ClienteService,
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
    this.servicioCliente.setDeleteFull(codigo).subscribe(
      (datos: ModeloClientes) => {
        this.cancelar();
        this.mensajeExito();
      },
      (error: any) => {
        this.mensajeFallo()
      }
    );
  }

  // buscar el dato en el backend y mostrarlo en el frontend
  GetBuscar(id: string) {
    this.servicioCliente.getListarId(id).subscribe((datos: ModeloClientes) => {
      this.fgValidador.controls['id'].setValue(datos.id);
    });
  }

  mensajeExito() {
    this._snackBar.open(`El cliente se elimino con exito`, '', {
      duration: 5000,
    });
    //window.location.reload();
  }

  mensajeFallo() {
    this._snackBar.open(`Ocurrio un error inesperado`, '', {
      duration: 2000,
    });
    this.cancelar();
    this.loading = false;
  }

  cancelar() {
    this.dialogRef.close();
  }
}
