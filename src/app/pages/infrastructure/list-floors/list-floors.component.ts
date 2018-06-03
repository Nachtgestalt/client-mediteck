import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-floors',
  templateUrl: './list-floors.component.html',
  styleUrls: ['./list-floors.component.css']
})
export class ListFloorsComponent implements OnInit {

  floors = [
    {
      Piso: '1',
      Seccion: 'Pediatría'
    },

    {
      Piso: '2',
      Seccion: 'Alergias'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
