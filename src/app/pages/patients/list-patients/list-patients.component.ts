import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  patients = [
    {
      Nombre: 'Omar',
      Apellidos: 'Mendez Garcia',
      Telefono: '2225750377',
      Sexo: 'Masculino',
      Edad: '12',
      Direccion: 'Prol. 14 Sur 12134-3',
      Tipo_sangre:'O+',
      Fecha_inscripcion:'12-10-2017'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
