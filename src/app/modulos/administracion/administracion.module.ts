import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './clientes/eliminar-cliente/eliminar-cliente.component';
import { BuscarClienteComponent } from './clientes/buscar-cliente/buscar-cliente.component';
import { ListarEmpleadosComponent } from './empleados/listar-empleados/listar-empleados.component';
import { EditarEmpleadosComponent } from './empleados/editar-empleados/editar-empleados.component';
import { CrearEmpleadosComponent } from './empleados/crear-empleados/crear-empleados.component';
import { EliminarEmpleadosComponent } from './empleados/eliminar-empleados/eliminar-empleados.component';
import { EliminarDirectivoComponent } from './directivos/eliminar-directivo/eliminar-directivo.component';
import { CrearDirectivoComponent } from './directivos/crear-directivo/crear-directivo.component';
import { EditarDirectivoComponent } from './directivos/editar-directivo/editar-directivo.component';
import { ListarDirectivoComponent } from './directivos/listar-directivo/listar-directivo.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent,
    BuscarClienteComponent,
    ListarEmpleadosComponent,
    EditarEmpleadosComponent,
    CrearEmpleadosComponent,
    EliminarEmpleadosComponent,
    EliminarDirectivoComponent,
    CrearDirectivoComponent,
    EditarDirectivoComponent,
    ListarDirectivoComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
