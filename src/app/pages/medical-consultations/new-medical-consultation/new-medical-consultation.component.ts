import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-medical-consultation',
  templateUrl: './new-medical-consultation.component.html',
  styleUrls: ['./new-medical-consultation.component.css']
})
export class NewMedicalConsultationComponent implements OnInit {

  form: FormGroup; 

  constructor() { }

  ngOnInit() {
    this.createFormGroup();
  }
  
  createFormGroup() {
    this.form = new FormGroup({
      'fecha': new FormControl(),
      'peso': new FormControl(),
      'talla': new FormControl(),
      'per_Cef': new FormControl(),
      'per_tor': new FormControl(),
      'costo': new FormControl(),
    });
  }

}
