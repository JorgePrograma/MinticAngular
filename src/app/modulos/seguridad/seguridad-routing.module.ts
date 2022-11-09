import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CerrarsesionComponent } from './cerrarsesion/cerrarsesion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';

const routes: Routes = [
  {
    path: 'identificar',
    component: IdentificacionComponent,
  },
  { path: 'cerrarsesion', component: CerrarsesionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
