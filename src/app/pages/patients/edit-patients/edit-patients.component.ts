import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-patients',
  templateUrl: './edit-patients.component.html',
  styleUrls: ['./edit-patients.component.css']
})

export class EditPatientsComponent implements OnInit {
  objeto: any = {
    nom_paciente: "",
    ap_paciente: "",
    tel_paciente: "",
    email_paciente: "",
    profs_paciente: "",
    edad_paciente: "",
    tipo_sangre: "",
    alergias: "",
    notas: ""
  }
  constructor() { }

  ngOnInit() {
  }

  save(){
    console.log("Guardar cambios");
  }

}
