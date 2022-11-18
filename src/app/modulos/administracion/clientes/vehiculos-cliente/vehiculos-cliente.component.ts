import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloClientes } from 'src/app/modelos/cliente.modelo';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { EliminarVehiculosComponent } from 'src/app/modulos/adminproductos/vehiculos/eliminar-vehiculos/eliminar-vehiculos.component';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-vehiculos-cliente',
  templateUrl: './vehiculos-cliente.component.html',
  styleUrls: ['./vehiculos-cliente.component.css'],
})
export class VehiculosClienteComponent implements OnInit {
  displayedColumns: string[] = [
    'color',
    'modelo',
    'serie_motor',
    'placa',
    'estado',
    'marca',
    'acciones',
  ];

  dataSource: MatTableDataSource<ModeloVehiculo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id:string=''

  constructor(
    private vehiculoServicio: VehiculoService,
    private clienteServicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getListarVehiculo(this.id);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  getListarVehiculo(id:string) {
    this.clienteServicio.getListarVehiculoCliente(id).subscribe((datos: ModeloVehiculo[]) => {
      this.dataSource.data = datos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
}
