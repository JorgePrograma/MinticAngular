import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-eliminar-vehiculos',
  templateUrl: './eliminar-vehiculos.component.html',
  styleUrls: ['./eliminar-vehiculos.component.css'],
})
export class EliminarVehiculosComponent implements OnInit {
  id_modal: string;
  loading: boolean = false;
  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });
  constructor(
    public dialogRef: DialogRef<EliminarVehiculosComponent>, // para mostrar modales
    private vehiculoServicio: VehiculoService,
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
    this.vehiculoServicio.setDelete(codigo).subscribe(
      (datos: ModeloVehiculo) => {
        this.cancelar();
        this.mensajeExito();
      },
      (error: any) => {}
    );
  }

  // buscar el dato en el backend y mostrarlo en el frontend
  GetBuscar(id: string) {
    this.vehiculoServicio
      .getListarId(id)
      .subscribe((datos: ModeloVehiculo) => {
        this.fgValidador.controls['id'].setValue(datos.id);
      });
  }

  mensajeExito() {
    this._snackBar.open(`El vehiculo se elimino con exito`, '', {
      duration: 2000,
    });
    this.router.navigate(['/productos/listar-vehiculos']);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
