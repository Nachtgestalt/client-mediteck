import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = new FormGroup({
      'seccion': new FormControl(),
      'piso': new FormControl(),
    });
  }

}
