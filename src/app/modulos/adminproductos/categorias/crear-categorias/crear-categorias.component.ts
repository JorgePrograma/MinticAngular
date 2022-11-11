import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  });

  constructor(
    private fb: FormBuilder,
    private servicioCategoria: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  setGuardarcategoria() {
    let nombre = this.fgValidador.controls['nombre'].value;
    let datos = new ModeloCategoria();
    datos.nombre = nombre;
    this.servicioCategoria.setAdd(datos).subscribe(
      (datos: ModeloCategoria) => {
        alert('Categoria agregada con exito');
        this.router.navigate(['/productos/listar-categorias']);
      },
      (error: any) => {
        alert('error al guardar categoria');
      }
    );
  }
}
