import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  seInicioSesion: boolean = false;

  subs: Subscription = new Subscription();

  constructor(private SeguridadServicio: SeguridadService) {}

  ngOnInit(): void {
    this.subs = this.SeguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe(
      (datos: ModeloIdentificar) => {
      this.seInicioSesion = datos.estaIdentificado;
      }
    );
  }
}
