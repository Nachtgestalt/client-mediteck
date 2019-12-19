import {Component} from '@angular/core';
import {DashboardMenuService} from '../../services/dashboard-menu/dashboard-menu.service';
import {PACIENTE} from '../../config/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any;
  acceptTerminus = false;

  constructor(public _dashboardMenuService: DashboardMenuService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.Tipo_usuario === PACIENTE) {
      if (this.user.signature === null || this.user.signature === '') {
        this.acceptTerminus = true;
      }
    }
  }
}
