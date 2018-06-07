import { Component, OnInit } from '@angular/core';
import {NurseService} from '../../services/nurse/nurse.service';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.css']
})
export class NursesComponent implements OnInit {

  nurses: any = []

  constructor( public _nurseService: NurseService) { }

  ngOnInit() {
    this._nurseService.getNurses()
      .subscribe(
        res => {
          this.nurses = res;
          console.log(res);
        }
      );
  }

}
