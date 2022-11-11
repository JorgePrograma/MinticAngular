import { Component, OnInit } from '@angular/core';
import { ModeloCategoria } from 'src/app/modelos/categoria.modelo';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css'],
})
export class ListarCategoriasComponent implements OnInit {
  lista: ModeloCategoria[] = [];


  constructor(private categoriaServicio: CategoriaService) {

  }

  ngOnInit(): void {
    this.getListadoCategorias()
  }

  getListadoCategorias(){
    this.categoriaServicio.getListar().subscribe((datos:ModeloCategoria[])=>{
      this.lista = datos;
    })
  }
}
