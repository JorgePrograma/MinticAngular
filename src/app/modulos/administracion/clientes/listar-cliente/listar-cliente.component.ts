import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModeloClientes } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { DetallesClienteComponent } from '../detalles-cliente/detalles-cliente.component';
import { EliminarClienteComponent } from '../eliminar-cliente/eliminar-cliente.component';
import { VehiculosClienteComponent } from '../vehiculos-cliente/vehiculos-cliente.component';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'],
})
export class ListarClienteComponent implements OnInit {
  displayedColumns: string[] = [
    'nombres',
    'cedula',
    'correo',
    'direccion',
    'acciones',
  ];
  dataSource: MatTableDataSource<ModeloClientes>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clienteServicio: ClienteService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getListarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListarClientes() {
    this.clienteServicio.getListar().subscribe((datos: ModeloClientes[]) => {
      this.dataSource.data = datos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  DetallesModals(id: string) {
    const dialogRef = this.dialog.open(DetallesClienteComponent, {
      width: '500px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/administracion/listar-clientes']);
    });
  }

  DetallesMisVehiculosModals(id: string) {
    const dialogRef = this.dialog.open(VehiculosClienteComponent, {
      width: '700px',
      height:'500px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/administracion/listar-clientes']);
    });
  }




  DeteleModals(id: string) {
    const dialogRef = this.dialog.open(EliminarClienteComponent, {
      width: '250px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/administracion/listar-clientes']);
    });
  }
}
