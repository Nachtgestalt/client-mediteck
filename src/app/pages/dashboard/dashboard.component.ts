import { Component, OnInit } from '@angular/core';
import {LeftsidebarService} from '../../services/leftsidebar/leftsidebar.service';
import {DashboardMenuService} from '../../services/dashboard-menu/dashboard-menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menus = [
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    },
    {
      title: 'Medicos'
    }
  ];

  constructor(public _dashboardMenuService: DashboardMenuService) { }

  ngOnInit() {
  }

}
