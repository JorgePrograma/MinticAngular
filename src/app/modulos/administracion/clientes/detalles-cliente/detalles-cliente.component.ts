import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModeloClientes } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css'],
})
export class DetallesClienteComponent implements OnInit {
  // variables locales
  lista?: ModeloClientes;
  id_modal: string;
  clase = 'Agregar';
  loading: boolean = false;

  // mostrar
  id?: string;
  nombre?: string;
  apellido?: string;
  cedula?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  edad?: number;
  fecha_nacimiento?: string;
  clave?: string;
  empresaId?: string;

  constructor(
    public dialogRef: DialogRef<DetallesClienteComponent>, // para mostrar modales
    private servicioCliente: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id_modal = data.id;
  }

  ngOnInit(): void {
    this.GetBuscar(this.id_modal);
  }

  GetBuscar(id: string) {
    this.servicioCliente.getListarId(id).subscribe((dato: ModeloClientes) => {
      this.id = dato.id;
      this.nombre = dato.nombre;
      this.apellido = dato.apellido;
      this.cedula = dato.cedula;
      this.telefono = dato.telefono;
      this.correo = dato.correo;
      this.direccion = dato.direccion;
      this.edad = dato.edad;
      this.fecha_nacimiento = dato.fecha_nacimiento;
      this.clave = dato.clave;
      this.empresaId = dato.empresaId;
    });
  }

  //cerrar el modal
  cancelar() {
    this.dialogRef.close();
  }
}
