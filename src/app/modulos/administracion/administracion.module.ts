import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionRoutingModule } from './administracion-routing.module';

// Cliente
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './clientes/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './clientes/listar-cliente/listar-cliente.component';

// Empleado
import { ListarEmpleadosComponent } from './empleados/listar-empleados/listar-empleados.component';
import { EditarEmpleadosComponent } from './empleados/editar-empleados/editar-empleados.component';
import { CrearEmpleadosComponent } from './empleados/crear-empleados/crear-empleados.component';
import { EliminarEmpleadosComponent } from './empleados/eliminar-empleados/eliminar-empleados.component';

// Directivo
import { EliminarDirectivoComponent } from './directivos/eliminar-directivo/eliminar-directivo.component';
import { CrearDirectivoComponent } from './directivos/crear-directivo/crear-directivo.component';
import { EditarDirectivoComponent } from './directivos/editar-directivo/editar-directivo.component';
import { ListarDirectivoComponent } from './directivos/listar-directivo/listar-directivo.component';

// otros Modulos componentes
import { SharedModule } from 'src/app/shared/shared.module';
import { DetallesClienteComponent } from './clientes/detalles-cliente/detalles-cliente.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EliminarClienteComponent,
    ListarEmpleadosComponent,
    EditarEmpleadosComponent,
    CrearEmpleadosComponent,
    EliminarEmpleadosComponent,
    EliminarDirectivoComponent,
    CrearDirectivoComponent,
    EditarDirectivoComponent,
    ListarDirectivoComponent,
    ListarClienteComponent,
    DetallesClienteComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    SharedModule,
  ]
})
export class AdministracionModule { }
