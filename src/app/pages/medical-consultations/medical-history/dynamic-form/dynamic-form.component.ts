import {Component, Input, OnInit} from '@angular/core';
import {QuestionBase} from '../../../../models/question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  constructor() { }

  ngOnInit() {
  }

  addTextbox(isChecked) {
    console.log('Valor de isChecked', isChecked);
  }

}
