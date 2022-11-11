import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminproductosRoutingModule } from './adminproductos-routing.module';

// imports  vehiculos
import { ListarVehiculosComponent } from './vehiculos/listar-vehiculos/listar-vehiculos.component';
import { CrearVehiculosComponent } from './vehiculos/crear-vehiculos/crear-vehiculos.component';
import { EditarVehiculosComponent } from './vehiculos/editar-vehiculos/editar-vehiculos.component';
import { EliminarVehiculosComponent } from './vehiculos/eliminar-vehiculos/eliminar-vehiculos.component';

// imports categorias
import { EliminarCategoriasComponent } from './categorias/eliminar-categorias/eliminar-categorias.component';
import { EditarCategoriasComponent } from './categorias/editar-categorias/editar-categorias.component';
import { CrearCategoriasComponent } from './categorias/crear-categorias/crear-categorias.component';
import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { SharedModule } from 'src/app/shared/shared.module';

// add libraries de angular components

@NgModule({
  declarations: [
    ListarVehiculosComponent,
    CrearVehiculosComponent,
    EditarVehiculosComponent,
    EliminarVehiculosComponent,
    EliminarCategoriasComponent,
    EditarCategoriasComponent,
    CrearCategoriasComponent,
    ListarCategoriasComponent,
  ],
  imports: [
    CommonModule,
    AdminproductosRoutingModule,
    SharedModule
  ],
})
export class AdminproductosModule {}
