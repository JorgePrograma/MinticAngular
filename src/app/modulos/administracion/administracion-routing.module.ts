import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './clientes/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './clientes/listar-cliente/listar-cliente.component';
import { CrearDirectivoComponent } from './directivos/crear-directivo/crear-directivo.component';
import { EditarDirectivoComponent } from './directivos/editar-directivo/editar-directivo.component';
import { EliminarDirectivoComponent } from './directivos/eliminar-directivo/eliminar-directivo.component';
import { ListarDirectivoComponent } from './directivos/listar-directivo/listar-directivo.component';
import { CrearEmpleadosComponent } from './empleados/crear-empleados/crear-empleados.component';
import { EditarEmpleadosComponent } from './empleados/editar-empleados/editar-empleados.component';
import { ListarEmpleadosComponent } from './empleados/listar-empleados/listar-empleados.component';

const routes: Routes = [
  // ruras de clientes
  {
    path: 'crear-cliente',
    component: CrearClienteComponent,
  },{
    path: 'editar-cliente/:id',
    component: CrearClienteComponent,
    canActivate:[ValidadorSesionGuard]
  },{
    path: 'eliminar-cliente',
    component: EliminarClienteComponent,
    canActivate:[ValidadorSesionGuard]
  },{
    path: 'listar-clientes',
    component: ListarClienteComponent,
    canActivate:[ValidadorSesionGuard]
  },

  // rutas de empleados
  {
    path: 'crear-empleado',
    component: CrearEmpleadosComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'editar-empleado/:id',
    component: CrearClienteComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'eliminar-empleado',
    component: EditarEmpleadosComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'listar-empleados',
    component: ListarEmpleadosComponent,
    canActivate:[ValidadorSesionGuard]
  },
  // rutas de directivos
  {
    path: 'crear-directivo',
    component: CrearDirectivoComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'editar-directivo',
    component: EditarDirectivoComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'eliminar-directivo',
    component: EliminarDirectivoComponent,
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: 'listar-directivos',
    component: ListarDirectivoComponent,
    canActivate:[ValidadorSesionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
