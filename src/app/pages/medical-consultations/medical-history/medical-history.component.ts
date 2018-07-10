import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {QuestionBase} from '../../../models/question-base';
import {QuestionControlService} from '../../../services/question/question-control.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  isCollapsedAntFam = true;
  isCollapsedAntPat = true;
  isCollapsedAntNoPat = true;

  isEditMedicalHistory = true;
  msgEditMedical = 'Editar';

  isDiabetesMellitus = false;
  isCancer = false;
  isHipertension = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      'AntecedentesPatologicos': new FormGroup({
        'DiabetesMellitus': new FormArray([this.createItem()])
      })
    });
  }

  editMedicalHistory() {
    this.isEditMedicalHistory = !this.isEditMedicalHistory;
    this.isEditMedicalHistory ? this.msgEditMedical = 'Editar' : this.msgEditMedical = 'Guardar';

    if (!this.isEditMedicalHistory) {
      this.isCollapsedAntFam = false;
      this.isCollapsedAntNoPat = false;
      this.isCollapsedAntPat = false;
    } else {
      this.payLoad = this.form.value;
      console.log(this.payLoad);
      this.isCollapsedAntFam = true;
      this.isCollapsedAntNoPat = true;
      this.isCollapsedAntPat = true;
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      description: ''
    });
  }

  showDescription(source) {
    switch (source) {
      case 'Diabetes mellitus': {
        this.isDiabetesMellitus = !this.isDiabetesMellitus;
        break;
      }
      case 'Cancer': {
        this.isCancer = !this.isCancer;
        break;
      }
      case 'Hipertension': {
        this.isHipertension = !this.isHipertension;
        break;
      }
    }
  }


}
