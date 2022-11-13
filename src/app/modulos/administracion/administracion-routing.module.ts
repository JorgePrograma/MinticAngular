import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  },{
    path: 'eliminar-cliente',
    component: EliminarClienteComponent,
  },{
    path: 'listar-clientes',
    component: ListarClienteComponent,
  },

  // rutas de empleados
  {
    path: 'crear-empleado',
    component: CrearEmpleadosComponent,
  },
  {
    path: 'editar-empleado/:id',
    component: CrearClienteComponent,
  },
  {
    path: 'eliminar-empleado',
    component: EditarEmpleadosComponent,
  },
  {
    path: 'listar-empleados',
    component: ListarEmpleadosComponent,
  },
  // rutas de directivos
  {
    path: 'crear-directivo',
    component: CrearDirectivoComponent,
  },
  {
    path: 'editar-directivo',
    component: EditarDirectivoComponent,
  },
  {
    path: 'eliminar-directivo',
    component: EliminarDirectivoComponent,
  },
  {
    path: 'listar-directivos',
    component: ListarDirectivoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
