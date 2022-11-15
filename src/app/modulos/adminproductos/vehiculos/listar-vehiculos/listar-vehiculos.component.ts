import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';
import { CrearVehiculosComponent } from '../crear-vehiculos/crear-vehiculos.component';
import { EliminarVehiculosComponent } from '../eliminar-vehiculos/eliminar-vehiculos.component';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.component.html',
  styleUrls: ['./listar-vehiculos.component.css'],
})
export class ListarVehiculosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'color',
    'modelo',
    'serie_motor',
    'placa',
    'clienteId',
    'acciones',
  ];
  dataSource: MatTableDataSource<ModeloVehiculo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehiculoServicio: VehiculoService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getListarVehiculo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListarVehiculo() {
    this.vehiculoServicio.getListar().subscribe((datos: ModeloVehiculo[]) => {
      this.dataSource.data = datos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //modals
  addEditVehiculo(id?: string) {
    const dialogRef = this.dialog.open(CrearVehiculosComponent, {
      width: '500px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('los datos');
    });
  }
  addDeleteModals(id?: string) {
    const dialogRef = this.dialog.open(EliminarVehiculosComponent, {
      width: '250',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/productos/listar-vehiculos']);
    });
  }
}
