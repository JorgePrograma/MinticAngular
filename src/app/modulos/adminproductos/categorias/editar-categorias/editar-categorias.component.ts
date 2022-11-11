import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCategoria } from 'src/app/modelos/categoria.modelo';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css'],
})
export class EditarCategoriasComponent implements OnInit {
  id: string = '';
  fgValidador: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    id: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private servicioCategoria: CategoriaService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];// "id" es el del id enrutador
    this.GetBuscar();
  }

  // buscar
  GetBuscar(){
    this.servicioCategoria.getListarId(this.id).subscribe((datos:ModeloCategoria)=>{
      this.fgValidador.controls['nombre'].setValue(datos.nombre)
      this.fgValidador.controls['id'].setValue(this.id)
    })
  }

  // actualizar
  setUpdatecategoria() {
    let nombre = this.fgValidador.controls['nombre'].value;

    let datos = new ModeloCategoria();
    datos.nombre = nombre;
    datos.id = this.id;

    this.servicioCategoria.setUpdate(datos).subscribe(
      (datos: ModeloCategoria) => {
        alert('Categoria actualizada con exito');
        this.router.navigate(['/productos/listar-categorias']);
      },
      (error: any) => {
        alert(`Error al actualizar categoria ${datos.id} ${datos.nombre}`);
      }
    );
  }
}
