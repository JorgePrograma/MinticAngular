import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  // return el inicio
  {
    path: 'inicio',
    component: InicioComponent,
  },

  // retorna la vista inicio si no viene con campos
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  // seguridad lanf
  {
    path: 'seguridad',
    loadChildren: () =>
      import('./modulos/seguridad/seguridad.module').then(
        (x) => x.SeguridadModule
      ),
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./modulos/administracion/administracion.module').then(
        (x) => x.AdministracionModule
      ),
  },

  {
    path: 'productos',
    loadChildren: () =>
      import('./modulos/adminproductos/adminproductos.module').then(
        (x) => x.AdminproductosModule
      ),
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
