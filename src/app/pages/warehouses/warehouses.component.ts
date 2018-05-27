import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  suscripciones = [
    {
      Nombre: 'Almacen del norte',
      Direccion: 'Calle del norte 123',
      Descripcion: 'Este almacen almacena cosas almacenadas'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
