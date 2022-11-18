import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CrearCategoriasComponent } from './categorias/crear-categorias/crear-categorias.component';
import { EliminarCategoriasComponent } from './categorias/eliminar-categorias/eliminar-categorias.component';
import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { CrearVehiculosComponent } from './vehiculos/crear-vehiculos/crear-vehiculos.component';
import { EliminarVehiculosComponent } from './vehiculos/eliminar-vehiculos/eliminar-vehiculos.component';
import { ListarVehiculosComponent } from './vehiculos/listar-vehiculos/listar-vehiculos.component';

const routes: Routes = [

  // rutas para vehiculos
  {
    path: 'crear-vehiculo',
    component: CrearVehiculosComponent,
    canActivate:[ValidadorSesionGuard]

  },
  {
    path: 'editar-vehiculo/:id',
    component: CrearVehiculosComponent,
    canActivate:[ValidadorSesionGuard]

  },
  {
    path: 'eliminar-vehiculo',
    component: EliminarVehiculosComponent,
    canActivate:[ValidadorSesionGuard]

  },
  {
    path: 'listar-vehiculos',
    component: ListarVehiculosComponent,
    canActivate:[ValidadorSesionGuard]

  },
  // rutas para categorias
  {
    path: 'crear-categoria',
    component: CrearCategoriasComponent,
    canActivate:[ValidadorSesionGuard]

  },
  {
    path: 'eliminar-categoria',
    component: EliminarCategoriasComponent,
    canActivate:[ValidadorSesionGuard]

  },
  {
    path: 'listar-categorias',
    component: ListarCategoriasComponent,
    canActivate:[ValidadorSesionGuard]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminproductosRoutingModule {}
