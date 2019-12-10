import {Component, OnInit} from '@angular/core';
import {LeftsidebarService} from '../../services/leftsidebar/leftsidebar.service';
import {ENFERMERA, MEDICO, PACIENTE} from '../../config/config';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  permission: any;
  permissionMedical = [1, 2, 6, 8, 3, 5, 6];
  permissionNurse = [1, 3, 6, 5];
  permissionPatient = [1, 6];
  permissionAll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14];

  constructor(public _leftsidebarService: LeftsidebarService) {
    switch (this.user.Tipo_usuario) {
      case MEDICO:
        this.permission = this.permissionMedical;
        break;
      case PACIENTE:
        this.permission = this.permissionPatient;
        break;
      case ENFERMERA:
        this.permission = this.permissionNurse;
        break;
      default:
        this.permission = this.permissionAll;
    }

    console.log('Permission --> ', this.permission);

  }

  ngOnInit() {
    console.log(this.user);
  }

  inArray(value: number) {
    const permission = this.permission.find(x => x === value);

    if (permission === value) {
      return true;
    }
    return false;
  }

}
