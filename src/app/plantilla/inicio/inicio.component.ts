import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  myImagenCorrectivo:string = 'assets/imagenes/correctivo.jpeg'
  myImagenPreventivo:string = 'assets/imagenes/preventivo.jpeg'
  myImagenPredictivo:string = 'assets/imagenes/predictivos.jpeg'

}
