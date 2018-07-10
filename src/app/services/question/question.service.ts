import { Injectable } from '@angular/core';
import {DropdownQuestion} from '../../models/dropdown-question';
import {QuestionBase} from '../../models/question-base';
import {TextboxQuestion} from '../../models/textbox-question';

@Injectable()
export class QuestionService {

  constructor() { }

  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'DiabetesMellitus',
        label: 'DiabetesMellitus',
        required: false,
        order: 2,
        type: 'checkbox',
        value: true
      }),

      new TextboxQuestion({
        key: 'Cancer',
        label: 'Cancer',
        required: false,
        order: 1,
        type: 'checkbox',
        value: true
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
