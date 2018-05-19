import { Component, OnInit } from '@angular/core';
import {LeftsidebarService} from '../../services/leftsidebar/leftsidebar.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {

  constructor(public _leftsidebarService: LeftsidebarService) { }

  ngOnInit() {
  }

}
