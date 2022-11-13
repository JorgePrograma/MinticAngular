import { ModeloCategoria } from 'src/app/modelos/categoria.modelo';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EliminarCategoriasComponent } from '../eliminar-categorias/eliminar-categorias.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CrearCategoriasComponent } from '../crear-categorias/crear-categorias.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css'],
})
export class ListarCategoriasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<ModeloCategoria>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriaServicio: CategoriaService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getListadoCategorias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListadoCategorias() {
    this.categoriaServicio.getListar().subscribe((datos: ModeloCategoria[]) => {
      this.dataSource.data = datos;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //modals
  addEditCategoria(id?: string) {
    console.log('este es el id que va capturado desde el listar ', id);
    const dialogRef = this.dialog.open(CrearCategoriasComponent, {
      width: '500px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('los datos');
    });
  }
  addDeleteModals(id?: string) {
    const dialogRef = this.dialog.open(EliminarCategoriasComponent, {
      width: '250',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/productos/listar-categorias']);
    });
  }
}
