import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloCategoria } from 'src/app/modelos/categoria.modelo';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-eliminar-categorias',
  templateUrl: './eliminar-categorias.component.html',
  styleUrls: ['./eliminar-categorias.component.css'],
})
export class EliminarCategoriasComponent implements OnInit {
  // validar los campos del formulario
  fgValidador: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: DialogRef<EliminarCategoriasComponent>,
    private fb: FormBuilder,
    private servicioCategoria: CategoriaService
  ) {}

  ngOnInit(): void {}

  cancelar() {
    this.dialogRef.close();
  }

  // metodo para enviar los datos al loopback
  setGuardarcategoria() {
    let nombre = this.fgValidador.controls['nombre'].value;
    let datos = new ModeloCategoria();
    datos.nombre = nombre;
    alert(datos.nombre);
     this.servicioCategoria.setAdd(datos).subscribe(
      (datos: ModeloCategoria) => {
        alert('Categoria agregada con exito');
        this.cancelar();
      },
      (error: any) => {
        alert('error al guardar categoria');
      }
    );
  }
}
